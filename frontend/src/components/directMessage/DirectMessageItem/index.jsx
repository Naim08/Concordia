import "../../message/MessageList/MessageItem/MessageItem.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TimeToolTip } from "../../modal/modal";
import { getEditMessageId } from "../../../store/ui";
import DirectEditMessageInput from "../EditDirectMessageInput/EditForm";
import DirectEditStatus from "../DirectEditMessage";
import DirectMessageEditOptions from "../EditDirectMessageInput/EditOptions";
import { getCurrentUser } from "../../../store/session";

const DirectMessageItem = ({
  message,
  user,
  date,
  extraTimeInfo,
  sessionId,
  editDisabled,
  participant,
}) => {
  const editMessageId = useSelector(getEditMessageId);
  const currentUser = message.author;
  const shortTime = date.toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const messageDay = new Date(date);
  messageDay.setHours(0, 0, 0, 0);

  const dayDifference =
    (currentDate.getTime() - messageDay.getTime()) / (1000 * 3600 * 24);
  let dateInfo;
  if (dayDifference < 1) dateInfo = "Today at";
  else if (dayDifference >= 1 && dayDifference < 2) dateInfo = "Yesterday at";
  else dateInfo = date.toLocaleDateString();

  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);

  const showHandler = (id) => (e) => {
    e.preventDefault();
    setCurrentModal(id);
    setShowModal(true);

    const rect = e.currentTarget.getBoundingClientRect();
    setTop(rect.y - 44);
    setLeft(rect.x - 70);
  };

  const leaveHandler = (e) => {
    if (e.type !== "wheel") e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  };

  if (!currentUser || !message) return null;
  return (
    <div
      className={`message-wrapper ${
        message.id === editMessageId ? "edit" : ""
      } ${editDisabled ? "delete-preview" : ""}`}
    >
      {sessionId === message.authorId &&
      message.id !== editMessageId &&
      !editDisabled ? (
        <DirectMessageEditOptions
          messageId={message.id}
          message={message}
          date={date}
          extraTimeInfo={extraTimeInfo}
        />
      ) : null}

      <div className="message-item-wrapper">
        <div className="profile-pic-wrapper">
          <img
            className="message-profile-pic"
            src={currentUser.profilePictureUrl}
            alt=""
          />
        </div>
        <div className="message-details-wrapper">
          <h3 className="message-header">
            <div className="author-username">
              {currentUser.username.split("#")[0]}
            </div>
            <div
              className="message-time long"
              onMouseOver={showHandler(message.id)}
              onMouseLeave={leaveHandler}
              onWheel={leaveHandler}
            >
              {showModal && currentModal === message.id && (
                <TimeToolTip
                  top={top}
                  left={left}
                  onClose={() => setShowModal(false)}
                >
                  <span className="tooltip">{`${extraTimeInfo} ${shortTime}`}</span>
                </TimeToolTip>
              )}
              {`${dateInfo} ${shortTime}`}
            </div>
          </h3>

          {message.id === editMessageId ? (
            <DirectEditMessageInput message={message} />
          ) : (
            <div className="message-body">
              {message.content}
              {message.updatedAt !== message.createdAt ? (
                <DirectEditStatus
                  updateTime={message.updatedAt}
                  messageId={message.id}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectMessageItem;
