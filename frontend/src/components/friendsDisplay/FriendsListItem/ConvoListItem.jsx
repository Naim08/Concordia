import "./FriendsListItem.css";
import { useSelector } from "react-redux";
import {
  getAnimateOfflineFriends,
  getFriendSearch,
  getSelectedFriendNavTab,
} from "../../../store/ui";
import { useEffect, useRef } from "react";
import UserIcon from "../../user/userIcon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ConvoListItem = ({
  userId,
  name,
  status,
  customStatus,
  picture,
  actions,
  conversationId,
}) => {
  const navigate = useNavigate();
  const [username, tag] = name.split("#");
  const animate = useSelector(getAnimateOfflineFriends);
  const search = useSelector(getFriendSearch);
  const selectedTab = useSelector(getSelectedFriendNavTab);
  const prevStatus = useRef(status);
  const selected = conversationId;
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (status !== prevStatus.current) {
      prevStatus.current = status;

      const listItem = document.getElementById(`friend-${userId}`);
      listItem.classList.add("shrink");
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

  const checkSelected = (id) => {
    if (selected === id.toString()) return "selected";
    return "";
  };
  const showHandler = (id) => (e) => {
    e.preventDefault();
    setCurrentModal(id);
    setShowModal(true);

    const rect = e.currentTarget.getBoundingClientRect();
    setTop(rect.y + 5);
  };

  const leaveHandler = (e) => {
    if (e.type !== "wheel") e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  };

  const handleImageError = (e) => {
    e.preventDefault();
    const newIcon = document.createElement("div");
    newIcon.classList.add("server-icon");
    newIcon.classList.add("filler");
    newIcon["data-key"] = id;
    newIcon.innerText = name[0].toUpperCase();
    e.target.replaceWith(newIcon);
  };

  const toggleSelected = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/conversations/${conversationId}`);
  };

  return (
    <div
      id={`friend-${userId}`}
      data-key={conversationId}
      className={`friend-list-item ${selectedTab} ${getStatusClass()} ${getAnimationStatus()}`}
      onAnimationEnd={setDisplay}
      onClick={toggleSelected}
      onMouseEnter={showHandler(conversationId)}
      onMouseLeave={leaveHandler}
      onWheel={leaveHandler}
    >
      <div className={`friend-item-display ${checkSelected(conversationId)}`}>
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
    </div>
  );
};

export default ConvoListItem;
