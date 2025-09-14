const getAnalytics = (orders) => {
  // Define the statuses you want to track
  const statusMap = [
    { status: "Pending", color: "#F3E351" },
    { status: "In Production", color: "#8962F0" },
    { status: "Shipped", color: "#FF8D1C" },
    { status: "Closed", color: "#28D373" },
  ];

  return statusMap.map((item) => {
    const count = orders.filter((order) => order.status === item.status).length;
    return { ...item, count };
  });
};

export default getAnalytics;
