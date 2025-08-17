import s from "./_s.module.scss";
// @ts-ignore
import SearchIcon from "@a/icons/search.svg?react";

const Search = () => {
  const handleSubmit = (e: any) => {
    const $input = e.target.querySelector("input");
    const search_value = $input.value.trim();
    console.log(`Searching for: ${search_value}`);
  };

  return (
    <form className={s.sForm} onSubmit={handleSubmit}>
      <SearchIcon />
      <input
        type="text"
        placeholder="Search orders by Order No. or Inv No. ..."
      />
    </form>
  );
};
export default Search;
