import { useParams } from "react-router-dom";
import ChannelSideBar from "../server/channelSidebar";
import "./mainSideBar.css";

const MainSideBar = () => {
  const { serverId } = useParams();

  return (
    <div className="main-side-bar">
      {serverId ? <ChannelSideBar /> : <> </>}
    </div>
  );
};

export default MainSideBar;
