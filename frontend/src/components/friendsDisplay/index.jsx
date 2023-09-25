import "./FriendsDisplay.css";
import { useSelector } from "react-redux";
import { getSelectedFriendNavTab } from "../../store/ui";
import FriendsNavBar from "./FriendsNavBar";
import FriendsAll from "./FriendsShowAll";
import FriendsOnline from "./FriendsOnline";
import FriendsAdd from "./FriendsAddRequest";
import FriendsPending from "./FriendsPendingRequest";
import FriendsBlocked from "./blockedFriends";

const FriendsDisplay = () => {
  const selected = useSelector(getSelectedFriendNavTab);

  const getDisplay = () => {
    switch (selected) {
      case "friends-online":
        return <FriendsOnline />;
      case "friends-all":
        return <FriendsAll />;
      case "friends-pending":
        return <FriendsPending />;
      case "friends-blocked":
        return <FriendsBlocked />;
      case "friends-add":
        return <FriendsAdd />;
      default:
        return <FriendsOnline />;
    }
  };

  return (
    <div className="friends-display">
      <FriendsNavBar />
      {getDisplay()}
    </div>
  );
};

export default FriendsDisplay;
