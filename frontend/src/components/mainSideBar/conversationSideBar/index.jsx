import "./conversationSideBar.css";
import ConversationsList from "../../conversationsList";

const ConversationSideBar = () => {
  return (
    <div className="conversation-container">
      <div className="search-bar">
        <input
          className="search-bar-input disabled"
          disabled
          type="text"
          placeholder="Find or start a conversation"
        />
      </div>
      <div className="conversation-list">
        <ConversationsList />
      </div>
    </div>
  );
};

export default ConversationSideBar;
