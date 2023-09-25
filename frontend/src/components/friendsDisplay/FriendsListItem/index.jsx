import "./FriendsListItem.css";
import { useSelector } from "react-redux";
import {
  getAnimateOfflineFriends,
  getFriendSearch,
  getSelectedFriendNavTab,
} from "../../../store/ui";
import { useEffect, useRef } from "react";
import UserIcon from "../../user/userIcon";
import ActionIcon from "./FriendActionIcon";

const FriendListItem = ({
  itemId,
  userId,
  name,
  status,
  customStatus,
  picture,
  actions,
}) => {
  const [username, tag] = name.split("#");
  const animate = useSelector(getAnimateOfflineFriends);
  const search = useSelector(getFriendSearch);
  const selectedTab = useSelector(getSelectedFriendNavTab);
  const prevStatus = useRef(status);

  useEffect(() => {
    if (status !== prevStatus.current) {
      prevStatus.current = status;

      const listItem = document.getElementById(`friend-${userId}`);
      if (status === "Offline" && selectedTab === "friends-all") {
        listItem.classList.remove("animate");
      } else if (status === "Offline" && selectedTab === "friends-online") {
        listItem.classList.add("shrink");
      } else if (status !== "Offline" && selectedTab === "friends-online") {
        listItem.removeAttribute("style");
        listItem.classList.add("grow");
      }
    }
  }, [status]);

  const getStatusClass = () => {
    if (status === "Offline" && selectedTab === "friends-all" && search)
      return "";
    else if (status === "Offline") return "offline";
    else return "";
  };

  const getAnimationStatus = () => {
    if (
      ["friends-online", "friends-all"].includes(selectedTab) &&
      animate &&
      !search
    ) {
      return "animate";
    } else {
      return "";
    }
  };

  const setDisplay = (e) => {
    if (status === "Offline" && selectedTab === "friends-online") {
      e.target.style.display = "none";
    }
  };

  return (
    <div
      id={`friend-${userId}`}
      className={`friend-list-item ${selectedTab} ${getStatusClass()} ${getAnimationStatus()}`}
      onAnimationEnd={setDisplay}
    >
      <div className="friend-item-display">
        <UserIcon picture={picture} status={status} name={username} />
        <div className="friend-item-details">
          <div className="friend-item-name-wrapper">
            <span className="friend-item-username">{username}</span>
            <span className="friend-item-tag">#{tag}</span>
          </div>

          {actions === "friendItem" ? (
            <div className="friend-item-status">
              <span className="status">
                {customStatus ? customStatus : status}
              </span>
            </div>
          ) : (
            <div className="friend-request-message">
              <span className="status">{customStatus}</span>
            </div>
          )}
        </div>
      </div>

      <div className="friend-item-options">
        {actions === "friendItem" ? (
          <>
            <ActionIcon actionType="message" itemId={itemId} />
            <ActionIcon
              actionType="deleteFriend"
              itemId={itemId}
              name={username}
            />
          </>
        ) : actions === "incomingItem" ? (
          <>
            <ActionIcon actionType="acceptRequest" itemId={itemId} />
            <ActionIcon actionType="ignoreRequest" itemId={itemId} />
          </>
        ) : actions === "outgoingItem" ? (
          <ActionIcon actionType="cancelRequest" itemId={itemId} />
        ) : null}
      </div>
    </div>
  );
};

export default FriendListItem;
