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
  active?: string;
  onOptionClick: (value: string) => void;
}

const Filter = ({ filter, active, onOptionClick }: Iprops) => {
  const [isOpened, setIsOpened] = useState(false);
  const isActiveOption = (opt: string) => active === opt;

  return (
    <div data-filter={filter.name} className={`${s.f} ${isOpened ? "open" : ""}`}>
      <button
        type="button"
        className={s.f_h}
        onClick={() => setIsOpened(!isOpened)}
      >
        <h3>{filter.name}</h3>
        {isOpened ? <MinusIcon /> : <PlusIcon />}
      </button>
      {isOpened && (
        <ul className={s.f_body}>
          {filter.options.map((opt) => (
            <li key={opt} onClick={() => onOptionClick(opt)}>
              {isActiveOption(opt) ? <CheckedBoxIcon /> : <CheckBoxIcon />}
              <span>{opt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
