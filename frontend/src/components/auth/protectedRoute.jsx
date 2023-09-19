import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const currentUser = useSelector(getCurrentUser);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      location.state ? navigate(location.state.from) : navigate("/login");
    }
  }, [currentUser]);

  //return <Navigate to="/login" />;
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
