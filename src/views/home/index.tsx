import s from "./_s.module.scss";
import { useEffect, useState } from "react";
import OrdersTable from "./components/orders table/Table";
import getOrders from "@/services/api/orders";
import Filters from "./components/filters/FiltersList";
import Analytics from "./components/analytics";
import Search from "./components/search";
import SortBy from "./components/sortBy";

const Home = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    getOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  return (
    <div className={s.p}>
      {/* <header></header> */}
      <aside>
        <Filters />
      </aside>
      <main>
        <Analytics orders={orders} />
        <div className={s.ctrl}>
          <div className={s.search_}>
            <Search />
          </div>
          <div className={s.sortBy_}>
            <SortBy />
          </div>
        </div>
        <OrdersTable orders={orders} />
      </main>
    </div>
  );
};

export default Home;
