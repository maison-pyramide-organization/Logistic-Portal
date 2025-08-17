import s from "./_s.module.scss";
import { useState } from "react";
// @ts-ignore
import PlusIcon from "@a/icons/plus.svg?react";
// @ts-ignore
import MinusIcon from "@a/icons/minus.svg?react";
// @ts-ignore
import CheckBoxIcon from "@a/icons/checkBox.svg?react";
// @ts-ignore
import CheckedBoxIcon from "@a/icons/checkedBox.svg?react";

interface Iprops {
  filter: any;
}
const Filter = (props: Iprops) => {
  const { filter } = props;
  const [isOpend, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpend);
  };

  return (
    <>
      <div className={`${s.f} ${isOpend ? "open" : ""}`}>
        <button type="button" className={s.f_h} onClick={handleClick}>
          <h3>{filter.name}</h3>
          {isOpend ? <MinusIcon /> : <PlusIcon />}
        </button>

        {isOpend && (
          <ul className={s.f_body}>
            {filter.options.map((opt) => (
              <li key={opt}>
                <CheckBoxIcon />
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Filter;
