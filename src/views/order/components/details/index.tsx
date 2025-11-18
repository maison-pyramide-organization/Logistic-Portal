import s from "./_s.module.scss";
import Status from "@/components/status";
import Info from "../info";
import DownBtn from "../downloadBtn";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import Popup from "@/components/popup";

interface Iprops {
  order: any;
}

const Details = (props: Iprops) => {
  const { user } = useContext(AuthContext);

  const {
    ocNumber,
    poNumber,
    status,
    brand,
    retailer,
    season,
    quantity,
    amount,
    paymentTerms,
    oc,
    po,
    productionStatus,
    financialDocuments,
  } = props.order;

  const x =
    user.type == "brand"
      ? { title: "Retailer", content: retailer }
      : { title: "Brand", content: brand };

  const infos: any = [
    { title: "Order Confirmation", content: ocNumber },
    { title: "Purchase Order", content: poNumber },
    x,
    { title: "Season", content: season, align: "right" },
    { title: "Quantity", content: quantity },
    { title: "Amount", content: amount },
    { title: "Payment Terms", content: paymentTerms },
    { title: "Production Status", content: productionStatus, align: "right" },
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
      <div className={s.d}>
        <div className={s.d_h}>
          <h2>Order Details</h2>
          <div>
            <Status status={status} />
          </div>
        </div>
        <div className={s.d_b}>
          {infos.map((info) => (
            <Info
              key={info.title}
              title={info.title}
              h={false}
              align={info?.align}
            >
              {info.content || "--"}
            </Info>
          ))}
        </div>
        <div className={s.line}></div>
        <div className={s.d_b}>
          <DownBtn title="Order Confirmation" doc={oc} />
          <DownBtn title="Purchase Order" doc={po} />
          <DownBtn title="Invoice" doc={oc} />
          <button className={s["f-docs"]} onClick={openPopup}>
            Financial Documents
          </button>
        </div>
      </div>
      {isOpened && (
        <Popup
          title="Financial Documents"
          documents={financialDocuments}
          close={closePopup}
        />
      )}
    </>
  );
};

export default Details;
