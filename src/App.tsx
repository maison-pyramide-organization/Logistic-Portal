import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import Test from "./views/test";
import Login from "./views/login";
import AuthProvider from "./contexts/authContext";
import PrivateRoute from "./layout/privateRoute";
import Order from "./views/order";
import Header from "./layout/header";

const App = () => {
  return (
    <AuthProvider>
      <Header/>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
