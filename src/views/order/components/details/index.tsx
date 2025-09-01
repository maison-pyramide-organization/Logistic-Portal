import OrderStatus from "@/components/status";
import s from "./_s.module.scss";
import Info from "../info";
import DownBtn from "../downloadBtn";

interface Iprops {
  order: any;
}

const Details = (props: Iprops) => {
  const {
    status,
    reference,
    brand,
    season,
    quantity,
    amount,
    paymentTerms,
    oc,
    po,
    invoice,
  } = props.order;

  const infos = [
    { title: "Order Reference", content: reference },
    { title: "Brand", content: brand },
    { title: "Season", content: season },
    { title: "Quantity", content: quantity },
    { title: "Amount", content: amount },
    { title: "Payment Terms", content: paymentTerms },
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
          <Info key={info.title} title={info.title}>
            {info.content || "--"}
          </Info>
        ))}
      </div>
      <div className={s.line}></div>
      <div className={s.d_b}>
        <DownBtn title="OC" doc={oc} />
        <DownBtn title="PO" doc={po} />
        <DownBtn title="Invoice" doc={oc} />
      </div>
    </div>
  );
};
export default Details;
