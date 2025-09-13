import s from "./_s.module.scss";
// @ts-ignore
import IClose from "@/assets/icons/close.svg?react";
// @ts-ignore
import IDownload from "@a/icons/download.svg?react";

const Popup = (props: any) => {
  const { title, documents, close } = props;

  const handleWrapClick = (e: any) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div className={s.popup_} onClick={handleWrapClick}>
      <div className={s.popup}>
        <div className={s.popup_h}>
          <h3>{title}</h3>
          <button className={s.close_btn} onClick={close}>
            <IClose />
          </button>
        </div>
        <div className={s.popup_b}>
          <ul>
            {documents?.length > 0 &&
              documents.map((doc, i) => (
                <li className={s.doc} key={i}>
                  {`${i + 1}- ${doc?.fields.title}`}
                  <a
                    href={doc?.fields.file.url}
                    download={doc?.fields.title}
                    target="_blank"
                    rel="noopener"
                    className={s.downBtn}
                  >
                    <IDownload />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Popup;
