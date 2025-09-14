import s from "./_s.module.scss";
import { useContext } from "react";
import Filter from "./filter";
import getFiltersList from "../../utils/getFilters";
import { OrdersContext } from "@/contexts/ordersContext";
import { ACTIONS } from "@/reducers/ordersReducer";
import SortBy from "./sortBy";
import { AuthContext } from "@/contexts/authContext";

const FiltersList = () => {

  const {
    state: { _orders: orders, filters },
    dispatch,
  } = useContext(OrdersContext);

  const { user } = useContext(AuthContext);

  const filtersList = getFiltersList(orders, user.type);

  const handleClearClick = () => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
  };

  const handleOptionClick = (filterName: string, filterOption: string) => {
    dispatch({
      type: ACTIONS.FILTER,
      payload: { filterName, filterOption },
    });
  };

  return (
    <div className={s.fl}>
      <div className={s.fl_h}>
        <div className={s.fl_h_t}>
          <h2>Filters</h2>
          <button onClick={handleClearClick}>Clear</button>
        </div>
        <div className={s.fl_h_b}>
          <p>
            {[filters.brand, filters.season, filters.status]
              .filter(Boolean) // remove undefined
              .join(" • ") || "No filters selected"}
          </p>
        </div>
      </div>

      <div className={s.fl_b}>
        <SortBy />

        {filtersList.map((f) => (
          <Filter
            key={f.name}
            filter={f}
            active={filters[f.name]}
            onOptionClick={(val) => handleOptionClick(f.name, val)}
          />
        ))}
      </div>
    </div>
  );

};

export default FiltersList;
