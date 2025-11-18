import s from "./_s.module.scss";
import Status from "@/components/status";
import Info from "../info";

interface Iprops {
  order: any;
}

const FinancialSummary = (props: Iprops) => {

  const {
    amount,
    settled,
    creditNote,
    outstanding,
    duePayment,
    paymentStatus,
    invoiceNumber,
    dueDate

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
    { title: "Due Date", content: dueDate },
  ];


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
        </div>
      </div>


    </>
  );
};
export default FinancialSummary;
