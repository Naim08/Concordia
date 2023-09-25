import "./mainSideBar.css";
import { useParams } from "react-router-dom";
import ChannelSideBar from "../server/channelSidebar";
import CurrentUserMenu from "../user";
import ConversationSideBar from "./conversationSideBar";

const MainSideBar = () => {
  const { serverId } = useParams();

  return (
    <div className="main-side-bar">
      {serverId ? <ChannelSideBar /> : <ConversationSideBar />}
      <CurrentUserMenu />
    </div>
  );
};

export default MainSideBar;
