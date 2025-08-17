import { useAuth } from "@/contexts/authContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
