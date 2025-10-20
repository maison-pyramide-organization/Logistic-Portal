import { useContext } from "react";
import s from "./_s.module.scss";
import { OrdersContext } from "@/contexts/ordersContext";
import { ACTIONS } from "@/reducers/ordersReducer";

const SortBy = () => {
  const sortOptions = ["last created", "last modified", "amount", "quantity"];
  const {
    state: { sortBy },
    dispatch,
  } = useContext(OrdersContext);

  const isActive = (sort: string) => {
    const classes = sort == sortBy ? s.active : "";
    return classes;
  };

  const handleClick = (sortOption: string) => {
    if (sortOption == sortBy) return;
    dispatch({ type: ACTIONS.SORT, payload: sortOption });
  };

  return (
    <div className={s.sortBy}>
      <h3>Sort By</h3>
      <ul>
        {sortOptions.map((opt) => (
          <li
            className={isActive(opt)}
            key={opt}
            onClick={() => handleClick(opt)}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortBy;
