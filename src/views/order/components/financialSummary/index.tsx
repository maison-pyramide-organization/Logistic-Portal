import Info from "../info";
import s from "./_s.module.scss";

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
  } = props.order;
  const infos = [
    { title: "Total Order Amount", content: amount },
    { title: "Settled", content: settled },
    { title: "Credit Note", content: creditNote },
  ];
  const infos2 = [
    { title: "Outstanding", content: outstanding },
    { title: "Due Payment", content: duePayment },
    { title: "Payment Status", content: paymentStatus },

  ];

  return (
    <div className={s.fs}>
      <div className={s.fs_h}>
        <h2>Financial Summary</h2>
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
  );
};
export default FinancialSummary;
