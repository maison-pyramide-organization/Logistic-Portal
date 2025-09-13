import client from "../contentful";

const getOrders = async () => {
  const { items } = await client.getEntries({
    content_type: "order",
  });

  const orders = items.map(({ fields, sys }) => ({
    ...fields,
    id: sys.id,
    // createdAt: sys.createdAt, // ISO8601 UTC
    modifiedAt: sys.updatedAt, // ISO8601 UTC
  }));

  return orders;
};

const getBrandOrders = async (brand: string) => {
  const { items } = await client.getEntries({
    content_type: "order",
    "fields.brand": brand,
  });

  const orders = items.map(({ fields, sys }) => ({
    ...fields,
    id: sys.id,
    modifiedAt: sys.updatedAt, // ISO8601 UTC
  }));

  return orders;
};

const getRetailerOrders = async (retailer: string) => {
  const { items } = await client.getEntries({
    content_type: "order",
    "fields.retailer": retailer,
  });

  const orders = items.map(({ fields, sys }) => ({
    ...fields,
    id: sys.id,
    modifiedAt: sys.updatedAt, // ISO8601 UTC
  }));

  return orders;
};

const getOrderById = async (orderId: string) => {
  try {
    const entry = await client.getEntry(orderId);

    if (!entry) return null;

    const { fields, sys } = entry;

    return {
      ...fields,
      id: sys.id,
      modifiedAt: sys.updatedAt,
    };
  } catch (err) {
    console.error("Error fetching order by id:", err);
    return null;
  }
};
// const getOrderById = async (orderId: string) => {
//   const { items } = await client.getEntries({
//     content_type: "order",
//     "fields.reference": orderId, // filter by field
//     limit: 1,
//   });

//   if (!items.length) return null;

//   const { fields, sys } = items[0];

//   return {
//     ...fields,
//     id: sys.id,
//     modifiedAt: sys.updatedAt,
//   };
// };

export { getOrderById, getBrandOrders, getRetailerOrders };
export default getOrders;
