import s from "./_s.module.scss";
import { useContext } from "react";
import { OrdersContext } from "@/contexts/ordersContext";
// @ts-ignore
import IChev from "@a/icons/chev.svg?react";
import { ACTIONS } from "@/reducers/ordersReducer";

const DateFilter = () => {
  const DatesOptions = ["last week", "last month", "last quarter"];

  const {
    state: { filters },
    dispatch,
  } = useContext(OrdersContext);

  const activeDate = filters.date;

  const isActive = (option: string) => {
    const classes = option == activeDate ? s.active : "";
    return classes;
  };

  const handleDateClick = (dateOption: string) => {
    dispatch({
      type: ACTIONS.FILTER,
      payload: { filterName: "date", filterOption: dateOption },
    });
  };

  return (
    <div className={`${s.df} disable-select`}>
      <IChev />
      <ul className="h-s">
        {DatesOptions.map((opt) => (
          <li
            className={isActive(opt)}
            key={opt}
            onClick={() => handleDateClick(opt)}
          >
            {opt}
          </li>
        ))}
      </ul>
      <IChev />
    </div>
  );
};
export default DateFilter;
