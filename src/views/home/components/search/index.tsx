// import { useContext } from "react";
// import s from "./_s.module.scss";
// // @ts-ignore
// import SearchIcon from "@a/icons/search.svg?react";
// import { OrdersContext } from "@/contexts/ordersContext";
// import { ACTIONS } from "@/reducers/ordersReducer";

// const Search = () => {
//   const { dispatch } = useContext(OrdersContext);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     const $input = e.target.querySelector("input");
//     const query = $input.value.trim();
//     dispatch({ type: ACTIONS.SEARCH_ORDERS, payload: query });
//   };

//   return (
//     <form className={s.sForm} onSubmit={handleSubmit}>
//       <SearchIcon />
//       <input
//         type="text"
//         placeholder="Search orders by Order No. or Inv No. ..."
//       />
//     </form>
//   );
// };
// export default Search;

import s from "./_s.module.scss";
import { useContext, useEffect, useState } from "react";
// @ts-ignore
import SearchIcon from "@a/icons/search.svg?react";
import { OrdersContext } from "@/contexts/ordersContext";
import { ACTIONS } from "@/reducers/ordersReducer";

const Search = () => {
  const { state, dispatch } = useContext(OrdersContext);
  const [q, setQ] = useState(state.search);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch({ type: ACTIONS.SEARCH_ORDERS, payload: q?.trim() });
    }, 200); // 200–300ms feels snappy
    return () => clearTimeout(id);
  }, [q]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SEARCH_ORDERS, payload: q.trim() });
  };

  return (
    <form className={s.sForm} onSubmit={handleSubmit} role="search">
      <SearchIcon />
      <input
        type="search"
        placeholder="Search orders by Order No. or Inv No. ..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </form>
  );
};
export default Search;
