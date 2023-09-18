import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../store/session";

const AuthRoute = () => {
  const currentUser = useSelector(getCurrentUser);

  if (currentUser) return <Navigate to="/home" />;

  return <Outlet />;
};

export default AuthRoute;
