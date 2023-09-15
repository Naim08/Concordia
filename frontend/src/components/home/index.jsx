import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-page">
      <h1>Home Page</h1>
    </div>
  );
};
