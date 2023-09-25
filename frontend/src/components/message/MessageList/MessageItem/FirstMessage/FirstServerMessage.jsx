import "../MessageItem.css";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getServer } from "../../../../../store/server";

const FirstServerMessage = () => {
  const { serverId } = useParams();
  const serverInfo = useSelector(getServer(serverId));

  if (!serverInfo) return null;

  return (
    <div className="first-server-message">
      <p className="first-message-header">Welcome to</p>
      <p className="first-message-header">{serverInfo.name}</p>
      <div className="first-message-subtext">
        This is the beginning of this server.
      </div>
    </div>
  );
};

export default FirstServerMessage;
