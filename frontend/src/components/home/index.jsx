import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import {
  getSelectedServer,
  getHomeRedirect,
  setAnimateOfflineFriends,
  setHomeRedirect,
  setSelectedServer,
} from "../../store/ui";
import myConsumer from "../../consumer";
import { fetchServers, getServers } from "../../store/server";
import styled from "styled-components";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useSelector(getCurrentUser);
  const getHomeRedirectState = useSelector(getHomeRedirect);

  useEffect(() => {
    if (getHomeRedirectState) {
      dispatch(setHomeRedirect(false));
      location.state ? navigate(location.state.from) : navigate("/");
    }
  }, [getHomeRedirectState]);

  useEffect(() => {
    if (currentUser) {
      dispatch(setSelectedServer("home"));
      dispatch(fetchServers());
    }
  }, [dispatch]);

  return (
    <div className="home-page">
      <i
        className="fa-brands fa-discord fa-beat fa-lg"
        style={{ color: "#5765f2" }}
      ></i>
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
