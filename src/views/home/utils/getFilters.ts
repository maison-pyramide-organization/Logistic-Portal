// utils/getFilters.ts
export interface FilterMeta {
  name: "brand" | "season" | "status" | "retailer";
  options: string[];
}

const uniq = <T>(arr: T[]) => [...new Set(arr.filter(Boolean))];

export default function getFiltersList(
  orders: any[],
  userType: string
): FilterMeta[] {
  const brands = uniq(orders.map((o) => o.brand)).sort((a, b) =>
    a.localeCompare(b)
  );
  const seasons = uniq(orders.map((o) => o.season));
  const statuses = uniq(orders.map((o) => o.status));
  const retailers = uniq(orders.map((o) => o.retailer.trim())).sort((a, b) =>
    a.localeCompare(b)
  );

  // Base filters that are common for all user types
  const commonFilters: any = [
    { name: "season", options: seasons },
    { name: "status", options: statuses },
  ];

  // Filters for 'brand' or 'retailer' depending on user type
  const dynamicFilter: any =
    userType === "brand"
      ? { name: "retailer", options: retailers }
      : { name: "brand", options: brands };

  // For 'admin' user type, include both 'brand' and 'retailer' filters

  if (userType === "admin") {
    return [
      { name: "brand", options: brands },
      { name: "retailer", options: retailers },
      ...commonFilters,
    ];
  }

  // For 'brand' or other user types, return only one dynamic filter
  return [dynamicFilter, ...commonFilters];
}
