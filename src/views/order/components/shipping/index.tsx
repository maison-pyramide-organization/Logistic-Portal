import s from "./_s.module.scss";
import Info from "../info";
import DownBtn from "../downloadBtn";
import Status from "@/components/status";
import { useState } from "react";
import Popup from "@/components/popup";

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
    others,
  } = props.order;

  const infos = [
    { title: "Shipping Terms", content: shippingTerms },
    { title: "Shipping Date", content: shippingDate },
    { title: "Tracking Number", content: trackingNumber },
    { title: "Delivery Date", content: deliveryDate },
  ];
  const [isOpened, setIsOpened] = useState(false);
  const openPopup = () => {
    setIsOpened(true);
  };

  const closePopup = () => {
    setIsOpened(false);
  };

  return (
    <>
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
          <button className={s.other} onClick={openPopup}>
            Other Documents
          </button>
        </div>
      </div>
      {isOpened && (
        <Popup title="Other Documents" documents={others} close={closePopup} />
      )}
    </>
  );
};

export default Shipping;
