import s from "./_s.module.scss";
import OrdersTable from "./components/orders table/Table";
import Filters from "./components/filters/FiltersList";
import Analytics from "./components/analytics";
import Search from "./components/search";
import SortBy from "./components/dateFilter";
import OrdersProvider from "@/contexts/ordersContext";

const Home = () => {
  return (
    <OrdersProvider>
      <div className={s.p}>
        <main className={s.m}>
          <aside>
            <Filters />
          </aside>
          <div className={s.content}>
            <Analytics />
            <div className={s.ctrl}>
              <div className={s.search_}>
                <Search />
              </div>
              <div className={s.sortBy_}>
                <SortBy />
              </div>
            </div>
            <OrdersTable />
          </div>
        </main>
      </div>
    </OrdersProvider>
  );
};

export default Home;
