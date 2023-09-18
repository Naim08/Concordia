import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../store/session";

const ProtectedRoute = () => {
  const currentUser = useSelector(getCurrentUser);

  if (!currentUser) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;
