import s from "./_s.module.scss";
import sortOptions from "@/data/sortOptions";
// @ts-ignore
import IChev from "@a/icons/chev.svg?react";
import { useState } from "react";

const SortBy = () => {
  const [activeOption, SetActiveOption] = useState(sortOptions[0]);

  const isActive = (sort: string) => {
    const classes = sort == activeOption ? `active` : "";
    return classes;
  };
  const handleClick = (sort: string) => {
    if (sort == activeOption) return;
    SetActiveOption(sort);
  };

  return (
    <div className={`${s.sortBy} disable-select`}>
      <IChev />
      <ul className="h-s">
        {sortOptions.map((option) => (
          <li
            className={isActive(option)}
            key={option}
            onClick={() => handleClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      <IChev />
    </div>
  );
};
export default SortBy;
