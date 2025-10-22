const getAnalytics = (orders) => {
  // Define the statuses you want to track
  const statusMap = [
    { title:"Pending", status: "Pending", color: "#F3E351" },
    {title:"In Production", status: "Confirmed", color: "#8962F0" },
    {title:"Shipped", status: "Processing", color: "#FF8D1C" },
    { title:"Closed",status: "Closed", color: "#28D373" },
  ];

  return statusMap.map((item) => {
    const count = orders.filter((order) => order.status === item.status).length;
    return { ...item, count };
  });
};

export default getAnalytics;
