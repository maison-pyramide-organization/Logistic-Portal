import s from "./_s.module.scss";
import Status from "@/components/status";
import Info from "../info";
import Popup from "@/components/popup";
import { useState } from "react";

interface Iprops {
  order: any;
}

const FinancialSummary = (props: Iprops) => {
  const [isOpened, setIsOpened] = useState(false);

  const {
    amount,
    settled,
    creditNote,
    outstanding,
    duePayment,
    paymentStatus,
    invoiceNumber,
    financialDocuments,
  } = props.order;

  const infos = [
    { title: "Invoice Number", content: invoiceNumber },
    { title: "Total Order Amount", content: amount },
    { title: "Settled", content: settled },
    { title: "Credit Note", content: creditNote },
  ];

  const infos2 = [
    { title: "Outstanding", content: outstanding },
    { title: "Due Payment", content: duePayment },
  ];
  const openPopup = () => {
    setIsOpened(true);
  };

  const closePopup = () => {
    setIsOpened(false);
  };

  return (
    <>
      <div className={s.fs}>
        <div className={s.fs_h}>
          <h2>Financial Summary</h2>
          <Status status={paymentStatus} />
        </div>

        <div className={s.fs_b}>
          {infos.map((info) => (
            <Info key={info.title} title={info.title} h>
              {info.content || "--"}
            </Info>
          ))}
        </div>
        <div className={s.line}></div>

        <div className={s.fs_b}>
          {infos2.map((info) => (
            <Info key={info.title} title={info.title} h>
              {info.content || "--"}
            </Info>
          ))}
          <button className={s.docsBtn} onClick={openPopup}>
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
export default FinancialSummary;
