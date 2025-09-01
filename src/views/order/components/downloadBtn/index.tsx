import s from "./_s.module.scss";
// @ts-ignore
import IDownload from "@a/icons/download.svg?react";

interface Iprops {
  title: string;
  doc: any;
}
const DownBtn = (props: Iprops) => {
  const { title, doc } = props;

  return (
    <a
      href={doc?.fields.file.url}
      download={doc?.fields.fileName}
      target="_blank"
      rel="noopener"
      className={s.downBtn}
    >
      {title}
      <IDownload />
    </a>
  );
};
export default DownBtn;
