import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import { useEffect } from "react";

const AuthRoute = () => {
  const currentUser = useSelector(getCurrentUser);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      location.state ? navigate(location.state.from) : navigate("/home");
    }
  }, [currentUser]);

  if (currentUser) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default AuthRoute;
