import { useContext } from "react";
import s from "./_s.module.scss";
import OrdersTableBody from "./TableBody";
import { AuthContext } from "@/contexts/authContext";
import { ACTIONS } from "@/reducers/ordersReducer";
import { OrdersContext } from "@/contexts/ordersContext";

const OrdersTable = () => {
  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(OrdersContext);

  const onBRClick = () => {
    dispatch({
      type: ACTIONS.SORT,
      payload: user.type == "brand" ? "retailer" : "brand",
    });
  };
  const onRClick = () => {
    dispatch({
      type: ACTIONS.SORT,
      payload: "retailer",
    });
  };

  return (
    <div className={s.table_}>
      <table className={s.table}>
        <thead className={s.table_h}>
          <tr className={s.table_r}>
            <th className={s.table_h}>season</th>
            <th className={s.table_h} onClick={onBRClick}>
              {user.type == "brand" ? "retailer" : "brand"}
            </th>
            {user.type == "admin" && (
              <th className={s.table_h} onClick={onRClick}>
                retailer
              </th>
            )}
            {user.type == "admin" ? (
              <>
                <th className={s.table_h}>Reference</th>
              </>
            ) : (
              <>
                <th className={s.table_h}>OC number</th>
                <th className={s.table_h}>PO number</th>
              </>
            )}
            <th className={s.table_h}>Remark</th>
            <th className={s.table_h}>status</th>
            <th className={s.table_h}>created</th>
            <th className={s.table_h}>quantity</th>
            <th className={s.table_h}>amount</th>
            <th className={s.table_h}>invoice Ref.</th>
            <th className={s.table_h}>tracking no.</th>
            {user.type == "admin" && (
              <>
                <th className={s.table_h}>shipping terms</th>
                <th className={s.table_h}>payment terms</th>
              </>
            )}
          </tr>
        </thead>
        <OrdersTableBody />
      </table>
    </div>
  );
};

export default OrdersTable;
