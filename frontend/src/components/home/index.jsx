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

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useSelector(getCurrentUser);
  const getHomeRedirectState = useSelector(getHomeRedirect);

  return (
    <div className="home-page">
      <i className="fa-solid fa-user-bounty-hunter"></i>
      <div className="bg-gray-800 text-white h-screen w-20 flex flex-col items-center py-4">
        {/* Logo at the top */}
        <i
          className="fa-brands fa-discord fa-beat fa-lg"
          style={{ color: "#5765f2", fontSize: "24px" }}
        ></i>

        {/* List of servers */}
        <div className="flex-1">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="mb-2">
                <div className="h-12 w-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs">{index + 1}</span>
                </div>
              </div>
            ))}
        </div>

        {/* User icon at the bottom */}
        <div>
          <i
            className="fa-solid fa-user-alien fa-lg fa-bounce"
            style={{ color: "#1a5dd1" }}
          ></i>
        </div>
      </div>
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
