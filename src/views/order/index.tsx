// import s from "./_s.module.scss";

import { getOrderById } from "@/services/api/orders";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Order = () => {
  const { orderId } = useParams() as any;

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    getOrderById(orderId).then((order) => {
      console.log(order);

      setOrder(order);
    });
  }, []);

  if (!order) return null;

  return (
    <>
      <div>Order ID: {orderId}</div>
      <a
        href={order.invoice.fields.file.url}
        download={order.invoice.fields.fileName}
        target="_blank"
        rel="noopener"
        className="btn"
      >
        download
      </a>
    </>
  );
};
export default Order;
