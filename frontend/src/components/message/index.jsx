import "./Messages.css";
import MessageNavBar from "./MessageNavBar";
import MemberList from "../member";
import MessageList from "./MessageList";

const MessageDisplay = () => {
  return (
    <div className="message-display">
      <MessageNavBar />
      <div className="messages-container">
        <MemberList />
        <MessageList />
      </div>
    </div>
  );
};

export default MessageDisplay;
