import s from "./_s.module.scss";
import OrderStatus from "@/components/status";
import Info from "../info";
import DownBtn from "../downloadBtn";

interface Iprops {
  order: any;
}

const Details = (props: Iprops) => {
  const {
    ocNumber,
    poNumber,
    status,
    brand,
    season,
    quantity,
    amount,
    paymentTerms,
    oc,
    po,
    productionStatus
  } = props.order;

  const infos = [
    { title: "Order Confirmation", content: ocNumber },
    { title: "Purchase Order", content: poNumber },
    { title: "Brand", content: brand },
    { title: "Season", content: season },
    { title: "Quantity", content: quantity },
    { title: "Amount", content: amount },
    { title: "Payment Terms", content: paymentTerms },
    { title: "Production Status", content: productionStatus },
  ];

  return (
    <div className={s.d}>
      <div className={s.d_h}>
        <h2>Order Details</h2>
        <div>
          <OrderStatus status={status} />
        </div>
      </div>
      <div className={s.d_b}>
        {infos.map((info) => (
          <Info key={info.title} title={info.title} h={false}>
            {info.content || "--"}
          </Info>
        ))}
      </div>
      <div className={s.line}></div>
      <div className={s.d_b}>
        <DownBtn title="Order Confirmation" doc={oc} />
        <DownBtn title="Purchase Order" doc={po} />
        <DownBtn title="Invoice" doc={oc} />
      </div>
    </div>
  );
};
export default Details;
