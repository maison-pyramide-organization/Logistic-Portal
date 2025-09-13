import s from "./_s.module.scss";
import Info from "../info";
import DownBtn from "../downloadBtn";
import Status from "@/components/status";

interface Iprops {
  order: any;
}

const Shipping = (props: Iprops) => {
  const {
    shippingTerms,
    shippingDate,
    trackingNumber,
    deliveryDate,
    deliveryStatus,
    awb,
    packingList,
    commercialInvoice,
  } = props.order;

  const infos = [
    { title: "Shipping Terms", content: shippingTerms },
    { title: "Shipping Date", content: shippingDate },
    { title: "Tracking Number", content: trackingNumber },
    { title: "Delivery Date", content: deliveryDate },
  ];

  return (
    <div className={s.sh}>
      <div className={s.sh_h}>
        <h2>Shipping</h2>
        <Status status={deliveryStatus} />
      </div>
      <div className={s.sh_b}>
        {infos.map((info) => (
          <Info key={info.title} title={info.title} h={false}>
            {info.content || "--"}
          </Info>
        ))}
      </div>
      <div className={s.line}></div>
      <div className={s.sh_b}>
        <DownBtn title="Commercial Inv" doc={commercialInvoice} />
        <DownBtn title="AWB" doc={awb} />
        <DownBtn title="Packing List" doc={packingList} />
      </div>
    </div>
  );
};

export default Shipping;
