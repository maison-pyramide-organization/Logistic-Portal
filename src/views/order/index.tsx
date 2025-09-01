import s from "./_s.module.scss";

import { getOrderById } from "@/services/api/orders";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "./components/details";
import FinancialSummary from "./components/financialSummary";
import Contact from "./components/contact";
import Notes from "./components/notes";
import Shipping from "./components/shipping";

const Order = () => {
  const { orderId } = useParams() as any;

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    getOrderById(orderId).then((order) => {
      setOrder(order);
    });
  }, []);

  if (!order) return null;

  return (
    <div className={s.p}>
      <main>
        <Details order={order} />
        <Shipping order={order} />
      </main>
      <aside>
        <FinancialSummary order={order} />
        <Contact />
        <Notes />
      </aside>
    </div>
  );
};
export default Order;
