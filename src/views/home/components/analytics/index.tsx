import s from "./_s.module.scss";
import { OrdersContext } from "@/contexts/ordersContext";
import { useContext } from "react";
import getAnalytics from "../../utils/getAnalytics";

const Analytics = () => {
  const {
    state: { _orders: orders },
  } = useContext(OrdersContext);

  // const status = [
  //   { status: "Pending", count: 10, color: "#F3E351" },
  //   { status: "In Production", count: 8, color: "#8962F0" },
  //   { status: "Shipped", count: 22, color: "#FF8D1C" },
  //   { status: "Closed", count: 32, color: "#28D373" },
  // ];

  const an = getAnalytics(orders);

  return (
    <>
      <div className={s.analytics}>
        {an.map((item) => (
          <div className={s.card} key={item.status}>
            <h2 style={{ borderLeft: `4px solid ${item.color}` }}>
              {item.title}
            </h2>
            <p>{item.count}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Analytics;
