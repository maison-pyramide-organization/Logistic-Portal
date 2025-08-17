const getPropertyValues = (orders: any[], property: string) => {
  return [...new Set(orders.map((order) => order[property]))];
};
