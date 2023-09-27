import "../message/MessageList/MessageItem/MessageItem.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TimeToolTip } from "../modal/modal";
import { getEditMessageId } from "../../store/ui";
import DirectEditMessageInput from "./EditDirectMessageInput/EditForm";
import DirectEditStatus from "./DirectEditMessage";
import DirectMessageEditOptions from "./EditDirectMessageInput/EditOptions";
import DirectMessageDeleteForm from "./EditDirectMessageInput/DeleteForm";

const SimpleMessageItem = ({ message, date, extraTimeInfo, sessionId }) => {
  const editMessageId = useSelector(getEditMessageId);

  const shortTime = date.toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

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

  return (
    <div
      className={`message-wrapper simple ${
        message.id === editMessageId ? "edit" : ""
      }`}
    >
      {sessionId === message.authorId && message.id !== editMessageId ? (
        <DirectMessageEditOptions
          messageId={message.id}
          message={message}
          date={date}
          extraTimeInfo={extraTimeInfo}
        />
      ) : null}

      <div className="message-item-wrapper simple">
        <div
          className="message-time"
          onMouseEnter={showHandler(message.id)}
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

          {shortTime}
        </div>

        {message.id === editMessageId ? (
          <DirectEditMessageInput message={message} />
        ) : (
          <div className="message-body">
            {message.body}
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
  );
};

export default SimpleMessageItem;
