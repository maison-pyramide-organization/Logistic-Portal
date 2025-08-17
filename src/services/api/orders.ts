import client from "../contentful";

const getOrders = async () => {
  const res = await client.getEntries({ content_type: "order" });
  const orders = res.items.map((order) => order.fields);
  return orders;
};

export default getOrders;
