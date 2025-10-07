import reducer, { ACTIONS, INITIAL_STATE } from "@/reducers/ordersReducer";
import getOrders, {
  getBrandOrders,
  getRetailerOrders,
} from "@/services/api/orders";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { AuthContext } from "./authContext";

interface Icontext {
  state: any;
  dispatch: Dispatch<any>;
}
interface Iprops {
  children: ReactNode;
}
export const OrdersContext = createContext<Icontext>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const OrdersProvider = ({ children }: Iprops) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const data = { state, dispatch };
  const { user } = useContext(AuthContext);
  if (!user) return null;

  useEffect(() => {
    const fetchOrders = async () => {
      let orders;
      switch (user.type) {
        case "brand":
          orders = await getBrandOrders(user.name);
          break;
        case "retailer":
          orders = await getRetailerOrders(user.name);
          break;
        default:
          orders = await getOrders();
          break;
      }
      // orders = await getOrders();

      dispatch({ type: ACTIONS.SET_ORDERS, payload: orders });
    };
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider value={data}>{children}</OrdersContext.Provider>
  );
};

export default OrdersProvider;
