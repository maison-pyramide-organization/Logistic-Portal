import formatDate from "../../utils/formatDate";
import s from "./_s.module.scss";

import { OrdersContext } from "@/contexts/ordersContext";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const OrdersTableBody = () => {
  const {
    state: { orders },
  } = useContext(OrdersContext);
  const navigate = useNavigate();
  const { type: userType } = useContext(AuthContext);

  const handleOrderClick = (e) => {
    const $orderRow = e.currentTarget;
    const orderId = $orderRow.getAttribute("data-id");

    navigate(`/orders/${orderId}`);
  };

  return (
    <tbody className={s.table_b}>
      {orders?.map((order) => (
        <tr
          className={s.table_r}
          key={order.reference}
          data-id={order.id}
          onClick={handleOrderClick}
        >
          <td className={s.table_d}>{order.reference || "-"}</td>
          <td className={s.table_d}>
            {userType == "brand" ? order.retailer : order.brand}
          </td>
          <td className={s.table_d}>{order.status}</td>
          <td className={s.table_d}>{formatDate(order.created)}</td>
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
