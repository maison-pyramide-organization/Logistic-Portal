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
  search: "",
};

const DATE_WINDOWS = {
  "last week": 7,
  "last month": 30,
  "last quarter": 90,
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

    case "amount":
      return orders.sort((a, b) => {
        // Remove any commas and convert to number
        const amountA = parseFloat(a.amount.replace(/[^0-9.-]+/g, ""));
        const amountB = parseFloat(b.amount.replace(/[^0-9.-]+/g, ""));
        return amountB - amountA; // Sort in descending order
      });
    default:
      return orders;
  }
};

const filterOrders = (orders, filters) => {
  const cutoff = filters.date ? getCutoffYmd(filters.date) : null;

  return orders.filter((o) => {
    const byBrand = !filters.brand || o.brand === filters.brand;
    const bySeason = !filters.season || o.season === filters.season;
    const byStatus = !filters.status || o.status === filters.status;
    const byDate = !cutoff || o.created >= cutoff;

    return byBrand && bySeason && byStatus && byDate;
  });
};

const searchOrders = (orders: any[], query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return orders;

  return orders.filter((o) => {
    const hay = [
      o.brand,
      o.season,
      o.retailer,
      o.reference,
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
    case ACTIONS.SET_ORDERS:
      const orders = action.payload;
      const SET_sorted_orders = sortOrders(orders, INITIAL_STATE.sortBy);

      return {
        ...state,
        _orders: SET_sorted_orders,
        orders: SET_sorted_orders,
      };

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
      const query = String(action.payload || "");

      const ordersResults = searchOrders(state._orders, query);
      return {
        ...state,
        search: query,
        orders: ordersResults,
      };
    }

    // CLEAR FILTERS
    case ACTIONS.CLEAR_FILTERS: {
      const filters = {};
      return {
        ...state,
        filters,
        orders: state._orders,
      };
    }
    // FILTER ORDERS
    case ACTIONS.FILTER: {
      const { filterName, filterOption } = action.payload;
      const option =
        state.filters[filterName] === filterOption ? undefined : filterOption; // toggle
      const filters = { ...state.filters, [filterName]: option };

      return {
        ...state,
        filters,
        orders: filterOrders(state._orders, filters),
      };
    }

    // SORT ORDERS
    case ACTIONS.SORT:
      const SORT_sort_by = action.payload;
      const SORT_sorted_orders = sortOrders(state.orders, SORT_sort_by);

      return {
        ...state,
        orders: SORT_sorted_orders,
        sortBy: SORT_sort_by,
      };
    default:
      return state;
  }
};

export default reducer;
