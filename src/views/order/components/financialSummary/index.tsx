import s from "./_s.module.scss";
import Status from "@/components/status";
import Info from "../info";
import hasDatePassed from "@/utils/hasDatePassed";
import parseNumber from "@/utils/parseNumber";

interface Iprops {
  order: any;
}

const FinancialSummary = (props: Iprops) => {
  const { amount, settled, creditNote, duePayment, invoiceNumber, dueDate } =
    props.order;

  let { paymentStatus, outstanding } = props.order;

  if (dueDate) {
    const x = hasDatePassed(dueDate);
  }

  const formatNumber = (value, original) => {
    const currency = original.match(/[^\d.,\s-]+/)?.[0] || "";

    return `${currency}${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (amount && settled) {
    const a = parseNumber(amount);
    const s = parseNumber(settled);
    const on = a - s;
    if (on <= 0) {
      paymentStatus = "Fully Paid";
    }

    const o = formatNumber(on, amount);
    outstanding = o;
  }

  const infos = [
    { title: "Due Date", content: dueDate },
    { title: "Invoice Number", content: invoiceNumber },
    { title: "Total Order Amount", content: amount },
    { title: "Settled", content: settled },
    { title: "Credit Note", content: creditNote },
  ];
  const infos2 = [
    { title: "Outstanding", content: outstanding },
    { title: "Due Payment", content: duePayment },
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
