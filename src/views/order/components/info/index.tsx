import s from "./_s.module.scss";

interface Iprops {
  title: string;
  children: any;
  h: boolean;
}
const Info = (props: Iprops) => {
  const { title, children, h } = props;

  const classes = h ? `${s.info} ${s.hor}` : s.info;

  return (
    <div className={classes}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
};
export default Info;
