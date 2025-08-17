import s from "./_s.module.scss";

interface Iprops {
  orders: any[];
}
const OrdersTableBody = (props: Iprops) => {
  const { orders } = props;

  return (
    <tbody className={s.table_b}>
      {orders?.map((order) => (
          <tr className={s.table_r} key={order.reference}>
            <td className={s.table_d}>{order.reference || "-"}</td>
            <td className={s.table_d}>{order.vendor || "-"}</td>
            <td className={s.table_d}>{order.status}</td>
            <td className={s.table_d}>{order.quantity}</td>
            <td className={s.table_d}>{order.amount}</td>
            <td className={s.table_d}>{order.season || "-"}</td>
            <td className={s.table_d}>{order.invoiceNumber}</td>
            <td className={s.table_d}>{order.trackingNumber}</td>
          </tr>
      ))}
    </tbody>
  );
};

export default OrdersTableBody;
