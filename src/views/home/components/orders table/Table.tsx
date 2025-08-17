import s from "./_s.module.scss";
import OrdersTableBody from "./TableBody";

interface Iprops {
  orders: any[];
}

const OrdersTable = (props: Iprops) => {
  const { orders } = props;
  const userType = "brand"; // Brand | Retailer
  return (
    <div className={s.table_}>
      <table className={s.table}>
        <thead className={s.table_h}>
          <tr className={s.table_r}>
            <th className={s.table_h}>order ref.</th>
            <th className={s.table_h}>
              {userType == "brand" ? "Retailer" : "Brand"}
            </th>
            <th className={s.table_h}>status</th>
            <th className={s.table_h}>quantity</th>
            <th className={s.table_h}>amount</th>
            <th className={s.table_h}>season</th>
            <th className={s.table_h}>invoice no.</th>
            <th className={s.table_h}>tracking no.</th>
          </tr>
        </thead>
        <OrdersTableBody orders={orders} />
      </table>
      {orders?.length == 0 && <p className={s.emptyText}>no orders found</p>}
    </div>
  );
};

export default OrdersTable;
