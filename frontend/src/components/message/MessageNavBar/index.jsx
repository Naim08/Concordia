import "./MessageNavBar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getShowMembersToggle, setShowMembers } from "../../../store/ui";
import { getChannel } from "../../../store/channel";
import { NavToolTip } from "../../modal/modal";

export const MessageNavBar = () => {
  const { channelId } = useParams();
  const channelInfo = useSelector(getChannel(channelId));
  const showMembers = useSelector(getShowMembersToggle);
  const [searchInput, setSearchInput] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);

  const showHandler = (id) => (e) => {
    e.preventDefault();
    setCurrentModal(id);
    setShowModal(true);

    let [xOffset, yOffset] = [0, 34];
    if (id === "member" && showMembers) xOffset = 55;
    else if (id === "member" && !showMembers) xOffset = 58;
    else if (id === "inbox") xOffset = 15;

    const rect = e.currentTarget.getBoundingClientRect();
    setLeft(rect.x - xOffset);
    setTop(rect.y + yOffset);
  };

  const leaveHandler = (e) => {
    e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  };

  const handleSearchClear = (e) => {
    e.preventDefault();

    document.querySelector(".message-search-input").focus();
    const searchEmptyIcon = document.querySelector(".message-search-empty");
    const searchClearIcon = document.querySelector(".message-search-clear");

    setSearchInput("");
    searchEmptyIcon.style.display = "inline";
    searchClearIcon.style.display = "none";
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const searchEmptyIcon = document.querySelector(".message-search-empty");
    const searchClearIcon = document.querySelector(".message-search-clear");

    if (e.target.value) {
      searchEmptyIcon.style.display = "none";
      searchClearIcon.style.display = "inline";
    } else {
      searchEmptyIcon.style.display = "inline";
      searchClearIcon.style.display = "none";
    }
    setSearchInput(e.target.value);
    // to do filter messages
  };

  let icon = null;
  const textIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
      ></path>
    </svg>
  );

  const privateTextIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M14 8C14 7.44772 13.5523 7 13 7H9.76001L10.3657 3.58738C10.4201 3.28107 10.1845 3 9.87344 3H8.88907C8.64664 3 8.43914 3.17391 8.39677 3.41262L7.76001 7H4.18011C3.93722 7 3.72946 7.17456 3.68759 7.41381L3.51259 8.41381C3.45905 8.71977 3.69449 9 4.00511 9H7.41001L6.35001 15H2.77011C2.52722 15 2.31946 15.1746 2.27759 15.4138L2.10259 16.4138C2.04905 16.7198 2.28449 17 2.59511 17H6.00001L5.39427 20.4126C5.3399 20.7189 5.57547 21 5.88657 21H6.87094C7.11337 21 7.32088 20.8261 7.36325 20.5874L8.00001 17H14L13.3943 20.4126C13.3399 20.7189 13.5755 21 13.8866 21H14.8709C15.1134 21 15.3209 20.8261 15.3632 20.5874L16 17H19.5799C19.8228 17 20.0306 16.8254 20.0724 16.5862L20.2474 15.5862C20.301 15.2802 20.0655 15 19.7549 15H16.35L16.6758 13.1558C16.7823 12.5529 16.3186 12 15.7063 12C15.2286 12 14.8199 12.3429 14.7368 12.8133L14.3504 15H8.35045L9.41045 9H13C13.5523 9 14 8.55228 14 8Z"
      ></path>
      <path
        fill="currentColor"
        d="M21.025 5V4C21.025 2.88 20.05 2 19 2C17.95 2 17 2.88 17 4V5C16.4477 5 16 5.44772 16 6V9C16 9.55228 16.4477 10 17 10H19H21C21.5523 10 22 9.55228 22 9V5.975C22 5.43652 21.5635 5 21.025 5ZM20 5H18V4C18 3.42857 18.4667 3 19 3C19.5333 3 20 3.42857 20 4V5Z"
      ></path>
    </svg>
  );

  const voiceIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z"
      ></path>
    </svg>
  );

  const privateVoiceIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 12C15 12.0007 15 12.0013 15 12.002C15 12.553 14.551 13.002 14 13.002V15.002C15.654 15.002 17 13.657 17 12.002C17 12.0013 17 12.0007 17 12H15ZM19 12C19 12.0007 19 12.0013 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 12.0013 21 12.0007 21 12H19ZM10.293 3.29604C10.579 3.01004 11.009 2.92504 11.383 3.07904C11.757 3.23204 12 3.59904 12 4.00204V20.002C12 20.407 11.757 20.772 11.383 20.927C11.009 21.082 10.579 20.996 10.293 20.71L6 16.002H3C2.45 16.002 2 15.552 2 15.002V9.00204C2 8.45304 2.45 8.00204 3 8.00204H6L10.293 3.29604Z"
      ></path>
      <path
        fill="currentColor"
        d="M21.025 5V4C21.025 2.88 20.05 2 19 2C17.95 2 17 2.88 17 4V5C16.4477 5 16 5.44772 16 6V9C16 9.55228 16.4477 10 17 10H19H21C21.5523 10 22 9.55228 22 9V5.975C22 5.43652 21.5635 5 21.025 5ZM20 5H18V4C18 3.42857 18.4667 3 19 3C19.5333 3 20 3.42857 20 4V5Z"
      ></path>
    </svg>
  );

  const dispatch = useDispatch();
  const handleMemberToggle = (e) => {
    e.preventDefault();
    dispatch(setShowMembers(!showMembers));
  };

  if (!channelInfo) return <div className="message-nav-bar" />;

  switch (channelInfo.channelType) {
    case "text":
      icon = textIcon;
      break;
    case "voice":
      icon = voiceIcon;
      break;
    case "privateText":
      icon = privateTextIcon;
      break;
    case "privateVoice":
      icon = privateVoiceIcon;
      break;
    default:
      icon = textIcon;
  }

  return (
    <div className="message-nav-bar">
      <div className="channel-header">
        <div className="channel-header-icon">{icon}</div>
        <h1 className="channel-header-name">{channelInfo.name}</h1>
      </div>

      <div className="actions-container">
        <div
          className={`icon-wrapper ${showMembers === true ? "selected" : ""}`}
          onMouseEnter={showHandler("member")}
          onMouseLeave={leaveHandler}
        >
          <svg
            x="0"
            y="0"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            onClick={handleMemberToggle}
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"
            ></path>
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"
            ></path>
            <path
              fill="currentColor"
              d="M20.0001 20.006H22.0001V19.006C22.0001 16.4433 20.2697 14.4415 17.5213 13.5352C19.0621 14.9127 20.0001 16.8059 20.0001 19.006V20.006Z"
            ></path>
            <path
              fill="currentColor"
              d="M14.8834 11.9077C16.6657 11.5044 18.0001 9.9077 18.0001 8.00598C18.0001 5.96916 16.4693 4.28218 14.4971 4.0367C15.4322 5.09511 16.0001 6.48524 16.0001 8.00598C16.0001 9.44888 15.4889 10.7742 14.6378 11.8102C14.7203 11.8418 14.8022 11.8743 14.8834 11.9077Z"
            ></path>
          </svg>
        </div>

        {showModal && currentModal === "member" && (
          <NavToolTip top={top} left={left} onClose={() => setShowModal(false)}>
            <span className="tooltip">
              {showMembers === true ? "Hide Member List" : "Show Member List"}
            </span>
          </NavToolTip>
        )}

        <div className="message-search-bar-wrapper">
          <input
            className="message-search-input disabled"
            disabled
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearch}
          />
          <div className="message-search-icon-wrapper">
            <svg
              className="message-search-empty"
              width="24"
              height="24"
              viewBox="0 0 30 30"
            >
              <path
                fill="currentColor"
                d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"
              ></path>
            </svg>
            <svg
              className="message-search-clear"
              width="24"
              height="24"
              viewBox="0 0 30 30"
              onClick={handleSearchClear}
            >
              <path
                fill="currentColor"
                d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
              ></path>
            </svg>
          </div>
        </div>

        <div
          className="icon-wrapper disabled"
          onMouseEnter={showHandler("inbox")}
          onMouseLeave={leaveHandler}
        >
          <svg
            x="0"
            y="0"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        {showModal && currentModal === "inbox" && (
          <NavToolTip top={top} left={left} onClose={() => setShowModal(false)}>
            <span className="tooltip">Inbox</span>
          </NavToolTip>
        )}
      </div>
    </div>
  );
};

export default MessageNavBar;
