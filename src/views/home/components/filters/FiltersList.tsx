import { useEffect, useState } from "react";
import s from "./_s.module.scss";
// @ts-ignore
import ChevIcon from "@a/icons/chev.svg?react";
import Filter from "./filter";

const FiltersList = () => {
  const filters = [
    { name: "Brands", options: ["ndd", "ddsfd", "gsdfsd"] },
    { name: "Seasons", options: ["ss24", "aw24", "fw25"] },
    {
      name: "Status",
      options: ["in production", "pending", "paid", "shipped"],
    },
  ];

  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setOpenIndex(index);
  };

  useEffect(() => {
    const $filters = document.querySelectorAll(`.${s.f}`);
    $filters.forEach((filter) => {
      const $body: any = filter.querySelector(`.${s.f_b}`);
      const $options_list = $body?.querySelector("ul");
      const $options_h = $options_list?.offsetHeight;
      $body?.style.setProperty("--height", `${$options_h}px`);
    });
  }, []);

  return (
    <div className={s.fl}>
      <div className={s.fl_h}>
        <div className={s.fl_h_t}>
          <h2>Filters</h2>
          <button>Clear</button>
        </div>
        <div className={s.fl_h_b}>
          <p>Monot - SS24 - Laila</p>
        </div>
      </div>

      <div className={s.fl_b}>
        <div className={s.f_date}>
          <h3>Date</h3>
          <ul>
            <li>last week</li>
            <li>last month</li>
            <li>last quarter</li>
          </ul>
        </div>

        {filters.map((filter) => (
          <Filter filter={filter} key={filter.name} />
        ))}
      </div>
    </div>
  );
};

export default FiltersList;
