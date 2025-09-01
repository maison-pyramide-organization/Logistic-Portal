import s from "./_s.module.scss";

interface Iprops {
  notes: any;
}
const Notes = (props: Iprops) => {
  const { notes } = props;
  return (
    <div className={s.n}>
      <div className={s.n_h}>
        <h2>Order Notes</h2>
      </div>
      <div className={s.n_b}>{notes || "No notes."}</div>
    </div>
  );
};
export default Notes;
