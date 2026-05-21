export const ACTIONS = {
  FILTER: "FILTER_ORDERS",
  SORT: "SORT_ORDERS",
  SET_ORDERS: "SET_ORDERS",
  SEARCH_ORDERS: "SEARCH_ORDERS",
  CLEAR_FILTERS: "CLEAR_FILTERS",
};

export const INITIAL_STATE = {
  filters: {},
  sortBy: "last created",
  _orders: [],
  orders: [],
  filterOrders: [],
  search: "",
};

const DATE_WINDOWS = {
  "this week": 7,
  "this month": 30,
  "this quarter": 90,
};

const computeOrders = (state, overrides: any = {}) => {
  const filters = overrides.filters ?? state.filters;
  const search = overrides.search ?? state.search;
  const sortBy = overrides.sortBy ?? state.sortBy;

  let result = state._orders;

  result = filterOrders(result, filters);
  result = searchOrders(result, search);
  result = sortOrders(result, sortBy);

  return result;
};

// format Date -> "YYYY-MM-DD" (uses local calendar day; consistent for our needs)
const ymd = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${y}-${m}-${day}`;
};

// inclusive cutoff: today minus N-1 days (so "last-week" includes today and 6 days back)
const getCutoffYmd = (dateOption): string => {
  console.log("do", dateOption);

  const n = DATE_WINDOWS[dateOption];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - (n - 1));

  return ymd(d);
};

const sortOrders = (orders: any, sortBy: string) => {
  switch (sortBy) {
    case "last created":
      return orders.sort((a, b) => {
        const dateA: any = new Date(a.created);
        const dateB: any = new Date(b.created);
        return dateB - dateA; // Sort in descending order
      });

    case "last modified":
      return orders.sort((a, b) => {
        const dateA: any = new Date(a.modifiedAt);
        const dateB: any = new Date(b.modifiedAt);
        return dateB - dateA; // Sort in descending order
      });

    case "quantity":
      return orders.sort((a, b) => {
        // Remove any commas and convert to number
        const amountA = parseInt(a.quantity) || 0;
        const amountB = parseInt(b.quantity) || 0;
        return amountB - amountA; // Sort in descending order
      });

    case "amount":
      return orders.sort((a, b) => {
        // Remove any commas and convert to number
        const amountA = parseFloat(a.amount?.replace(/[^0-9.-]+/g, "")) || 0;
        const amountB = parseFloat(b.amount?.replace(/[^0-9.-]+/g, "")) || 0;
        return amountB - amountA; // Sort in descending order
      });

    case "brand":
      return orders.sort((a, b) => {
        const brandA = a.brand?.trim().toLowerCase() || "";
        const brandB = b.brand?.trim().toLowerCase() || "";
        return brandA.localeCompare(brandB);
      });

    case "retailer":
      return orders.sort((a, b) => {
        const brandA = a.retailer?.trim().toLowerCase() || "";
        const brandB = b.retailer?.trim().toLowerCase() || "";
        return brandA.localeCompare(brandB);
      });

    default:
      return orders;
  }
};

// const filterOrders = (orders, filters) => {
//   const cutoff = filters.date ? getCutoffYmd(filters.date) : null;

//   return orders.filter((o) => {
//     // const byBrand =
//     //   !filters.brand?.trim() || o.brand?.trim() === filters.brand.trim();
//     const byBrand =
//       !filters.brand?.length || filters.brand.includes(o.brand?.trim());
//     const bySeason = !filters.season || o.season === filters.season;
//     const byStatus = !filters.status || o.status === filters.status;
//     const byRetailer =
//       !filters.retailer?.trim() ||
//       o.retailer?.trim() === filters.retailer?.trim();
//     const byDate = !cutoff || o.created >= cutoff;

//     return byBrand && bySeason && byStatus && byRetailer && byDate;
//   });
// };

const matchesArrayFilter = (filterValues, value) => {
  if (!filterValues?.length) return true;

  return filterValues.includes(value?.trim?.() || value);
};

const filterOrders = (orders, filters) => {
  const cutoff = filters.date?.length ? getCutoffYmd(filters.date) : null;

  return orders.filter((o) => {
    const byBrand = matchesArrayFilter(filters.brand, o.brand);

    const bySeason = matchesArrayFilter(filters.season, o.season);

    const byStatus = matchesArrayFilter(filters.status, o.status);

    const byRetailer = matchesArrayFilter(filters.retailer, o.retailer);

    const byDate = !cutoff || o.created >= cutoff;

    return byBrand && bySeason && byStatus && byRetailer && byDate;
  });
};

const searchOrders = (orders: any[], query: string) => {
  const q = query?.trim().toLowerCase();

  if (!q) return orders;

  return orders.filter((o) => {
    const hay = [
      o.brand,
      o.season,
      o.retailer,
      // o.reference,
      o.trackingNumber,
      o.invoiceNumber,
      o.created, // "YYYY-MM-DD" string
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return hay.includes(q);
  });
};

//
// REDUCER FUNCTION
//
const reducer = (state, action) => {
  switch (action.type) {
    // SET ORDERS
    case ACTIONS.SET_ORDERS: {
      const orders = action.payload;

      const newState = {
        ...state,
        _orders: orders,
      };

      return {
        ...newState,
        orders: computeOrders(newState),
      };
    }

    // FILTER ORDERS
    case ACTIONS.CLEAR_FILTERS: {
      const filters = {};
      return {
        ...state,
        filters,
        orders: filterOrders(state._orders, filters),
      };
    }

    // SEARCH ORDERS
    case ACTIONS.SEARCH_ORDERS: {
      const search = String(action.payload || "");

      const newState = {
        ...state,
        search,
      };

      return {
        ...newState,
        orders: computeOrders(newState),
      };
    }

    // CLEAR FILTERS
    case ACTIONS.CLEAR_FILTERS: {
      const newState = {
        ...state,
        filters: {},
      };

      return {
        ...newState,
        orders: computeOrders(newState),
      };
    }

    // FILTER ORDERS
    case ACTIONS.FILTER: {
      const { filterName, filterOption } = action.payload;

      const currentFilter = state.filters[filterName] || [];
      const exists = currentFilter.includes(filterOption);

      const updatedFilter = exists
        ? currentFilter.filter((v) => v !== filterOption)
        : [...currentFilter, filterOption];

      const newState = {
        ...state,
        filters: {
          ...state.filters,
          [filterName]: updatedFilter,
        },
      };

      return {
        ...newState,
        orders: computeOrders(newState),
      };
    }

    // SORT ORDERS
    case ACTIONS.SORT: {
      const sortBy = action.payload;

      const newState = {
        ...state,
        sortBy,
      };

      return {
        ...newState,
        orders: computeOrders(newState),
      };
    }

    default:
      return state;
  }
};

export default reducer;
