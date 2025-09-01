import s from "./_s.module.scss";

interface Iprops {
  status: string;
}

const OrderStatus = (props: Iprops) => {
  const { status } = props;
  const classes = `${s.status} ${s[status.replace(" ", "")?.toLowerCase()]}`;

  return <div className={classes}>{status}</div>;
};
export default OrderStatus;
