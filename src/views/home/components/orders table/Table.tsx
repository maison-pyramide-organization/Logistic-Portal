import { useContext } from "react";
import s from "./_s.module.scss";
import OrdersTableBody from "./TableBody";
import { AuthContext } from "@/contexts/authContext";

const OrdersTable = () => {
  const { type: userType } = useContext(AuthContext);

  return (
    <div className={s.table_}>
      <table className={s.table}>
        <thead className={s.table_h}>
          <tr className={s.table_r}>
            <th className={s.table_h}>order ref.</th>
            <th className={s.table_h}>
              {userType == "brand" ? "retailer" : "brand"}
            </th>
            <th className={s.table_h}>status</th>
            <th className={s.table_h}>created</th>
            <th className={s.table_h}>quantity</th>
            <th className={s.table_h}>amount</th>
            <th className={s.table_h}>season</th>
            <th className={s.table_h}>invoice no.</th>
            <th className={s.table_h}>tracking no.</th>
          </tr>
        </thead>
        <OrdersTableBody />
      </table>
    </div>
  );
};

export default OrdersTable;
