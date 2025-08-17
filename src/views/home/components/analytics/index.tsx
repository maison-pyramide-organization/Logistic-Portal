import s from "./_s.module.scss";
import { useEffect } from "react";

interface Iprops {
  orders: any[];
}
const Analytics = (props: Iprops) => {
  const { orders } = props;

  const status = [
    { status: "Pending", count: 10, color: "#F3E351" },
    { status: "In Production", count: 8, color: "#8962F0" },
    { status: "Shipped", count: 22, color: "#FF8D1C" },
    { status: "Completed", count: 32, color: "#28D373" },
  ];

  useEffect(() => {
    orders.forEach((order) => {
      const statusItem = status.find((s) => s.status === order.status);
      if (statusItem) {
        statusItem.count += 1;
      }
    });
  });

  return (
    <>
      <div className={s.analytics}>
        {status.map((item) => (
          <div className={s.card} key={item.status}>
            <h2 style={{ borderLeft: `4px solid ${item.color}` }}>
              {item.status}
            </h2>
            <p>{item.count}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Analytics;
