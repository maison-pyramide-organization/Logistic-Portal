import s from "./_s.module.scss";
// @ts-ignore
import IDownload from "@a/icons/download.svg?react";

interface Iprops {
  title: string;
  doc: any;
}
const DownBtn = (props: Iprops) => {
  const { title, doc } = props;
  const isDisabled = !doc;

  return (
    <a
      href={doc?.fields.file.url}
      download={doc?.fields.fileName}
      target="_blank"
      rel="noopener"
      className={`${s.downBtn} ${isDisabled ? s.disabled : ""}`}
    >
      {title}
      {!isDisabled && <IDownload />}
    </a>
  );
};
export default DownBtn;
