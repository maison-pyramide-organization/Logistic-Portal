import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import Test from "./views/test";
import Login from "./views/login";
import AuthProvider from "./contexts/authContext";
import PrivateRoute from "./layout/privateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
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
