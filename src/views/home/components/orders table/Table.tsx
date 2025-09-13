import { useContext } from "react";
import s from "./_s.module.scss";
import OrdersTableBody from "./TableBody";
import { AuthContext } from "@/contexts/authContext";

const OrdersTable = () => {
  const {user} = useContext(AuthContext);

  return (
    <div className={s.table_}>
      <table className={s.table}>
        <thead className={s.table_h}>
          <tr className={s.table_r}>
            <th className={s.table_h}>OC number</th>
            <th className={s.table_h}>PO number</th>
            <th className={s.table_h}>
              {user.type == "brand" ? "retailer" : "brand"}
            </th>
            {user.type == "admin" &&(
            <th className={s.table_h}>
              retailer
            </th>
            )}
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
