// utils/getFilters.ts
export interface FilterMeta {
  name: "brand" | "season" | "status" ;
  options: string[];
}

const uniq = <T>(arr: T[]) => [...new Set(arr.filter(Boolean))];

export default function getFiltersList(orders: any[]): FilterMeta[] {
  const brands = uniq(orders.map((o) => o.brand));
  const seasons = uniq(orders.map((o) => o.season));
  const statuses = uniq(orders.map((o) => o.status));

  return [
    { name: "brand", options: brands },
    { name: "season", options: seasons },
    { name: "status", options: statuses },
  ];
}
