import formatDate from "../../utils/formatDate";
import s from "./_s.module.scss";

import { OrdersContext } from "@/contexts/ordersContext";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Status from "@/components/status";
const OrdersTableBody = () => {
  const {
    state: { orders },
  } = useContext(OrdersContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOrderClick = (e) => {
    const $orderRow = e.currentTarget;
    const orderId = $orderRow.getAttribute("data-id");
    navigate(`/orders/${orderId}`);
  };

  const formatRef = (ref) => {
    if (!ref) return "";
    return ref.replace(/\s*&\s*/g, "<br>");
  };

  return (
    <tbody className={s.table_b}>
      {orders?.map((order, i) => (
        <tr
          className={s.table_r}
          key={i}
          data-id={order.id}
          onClick={handleOrderClick}
        >
          <td className={s.table_d}>{order.season || "-"}</td>

          <td className={s.table_d}>
            {user.type == "brand" ? order.retailer : order.brand}
          </td>

          {user.type == "admin" && (
            <td className={s.table_d}>{order.retailer}</td>
          )}
          {user.type == "admin" ? (
            <>
              <td className={s.table_d}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatRef(order.reference),
                  }}
                />
              </td>
            </>
          ) : (
            <>
              <td className={s.table_d}>{order.ocNumber || "--"}</td>
              <td className={s.table_d}>{order.poNumber || "--"}</td>
            </>
          )}
          <td className={s.table_d}>{order.remark || "--"}</td>
          <td className={s.table_d}>
            {order.status ? <Status status={order.status} /> : "--"}
          </td>
          <td className={s.table_d}>{formatDate(order.created)}</td>
          <td className={s.table_d}>{order.quantity || "--"}</td>
          <td className={s.table_d}>{order.amount || "--"}</td>
          <td className={s.table_d}>{order.invoiceNumber}</td>
          <td className={s.table_d}>
            <div
              dangerouslySetInnerHTML={{
                __html: formatRef(order.trackingNumber),
              }}
            />
          </td>
          {user.type == "admin" && (
            <>
              <td className={s.table_d}>{order.shippingTerms || "--"}</td>
              <td className={s.table_d}>{order.paymentTerms || "--"}</td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default OrdersTableBody;
