import s from "./_s.module.scss";
import Info from "../info";
import DownBtn from "../downloadBtn";

interface Iprops {
  order: any;
}

const Shipping = (props: Iprops) => {
  const {
    shippingStatus,
    shippingDate,
    trackingNumber,
    awb,
    packingList,
    commercialInvoice,
  } = props.order;

  return (
    <div className={s.sh}>
      <div className={s.sh_h}>
        <h2>Shipping</h2>
      </div>
      <div className={s.sh_b}>
        <Info title="Shipping Status">{shippingStatus}</Info>
        <Info title="Shipping Date">{shippingDate}</Info>
        <Info title="Tracking Number">{trackingNumber}</Info>
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
