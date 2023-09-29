import "./FriendsListItem.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  acceptReceivedRequest,
  cancelSentRequest,
  ignoreReceivedRequest,
} from "../../../store/friendRequest";
import { ActionToolTip, ServerFormModal } from "../../modal/modal";
import { setServerFormSlide } from "../../../store/ui";
import DeleteFriendForm from "./DeleteFriend";
import { createConversation } from "../../../store/conversation";
import { useNavigate } from "react-router-dom";

const ActionIcon = ({ actionType, itemId, name }) => {
  const nagivate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);
  const [showDeleteFriendModal, setShowDeleteFriendModal] = useState(false);

  const showHandler = (id) => (e) => {
    e.preventDefault();
    setCurrentModal(id);
    setShowModal(true);

    const rect = e.currentTarget.getBoundingClientRect();
    setTop(rect.y - 40);
    setLeft(rect.x - leftOffset);
  };

  const leaveHandler = (e) => {
    e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  };

  const dispatch = useDispatch();

  const closeDeleteForm = () => {
    const serverFormModal = document.querySelector(".modal-content");
    dispatch(setServerFormSlide("close"));
    serverFormModal.addEventListener(
      "animationend",
      (e) => {
        setShowDeleteFriendModal(false);
      },
      { once: true }
    );
  };

  const deleteFriendHandler = (e) => {
    e.preventDefault();
    setShowDeleteFriendModal(true);
  };

  const ignoreRequestHandler = (e) => {
    e.preventDefault();
    dispatch(ignoreReceivedRequest(itemId));
  };

  const acceptRequestHandler = (e) => {
    e.preventDefault();
    dispatch(acceptReceivedRequest(itemId));
  };

  const cancelRequestHandler = (e) => {
    e.preventDefault();
    dispatch(cancelSentRequest(itemId));
  };

  const messageHandler = (e) => {
    e.preventDefault();
    dispatch(createConversation(itemId));
  };

  const messageIcon = (
    <svg
      className="action-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill="currentColor"
        d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"
      ></path>
    </svg>
  );

  const moreIcon = (
    <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <path d="M24 0v24H0V0z"></path>
        <path
          fill="currentColor"
          d="M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z"
        ></path>
      </g>
    </svg>
  );

  const acceptIcon = (
    <svg
      className="action-icon accept"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
      ></path>
    </svg>
  );

  const deleteIcon = (
    <svg
      className="action-icon delete"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
      ></path>
    </svg>
  );

  let icon, tooltipText, clickHandler, leftOffset;
  switch (actionType) {
    case "message":
      icon = messageIcon;
      tooltipText = "Message";
      clickHandler = messageHandler;
      leftOffset = 17;
      break;
    case "deleteFriend":
      icon = deleteIcon;
      tooltipText = "Remove";
      clickHandler = deleteFriendHandler;
      leftOffset = 16;
      break;
    case "acceptRequest":
      icon = acceptIcon;
      tooltipText = "Accept";
      clickHandler = acceptRequestHandler;
      leftOffset = 12;
      break;
    case "ignoreRequest":
      icon = deleteIcon;
      tooltipText = "Ignore";
      clickHandler = ignoreRequestHandler;
      leftOffset = 10;
      break;
    case "cancelRequest":
      icon = deleteIcon;
      tooltipText = "Cancel";
      clickHandler = cancelRequestHandler;
      leftOffset = 13;
      break;
    default:
      icon = moreIcon;
      tooltipText = "More";
      clickHandler = null;
      leftOffset = 17;
  }

  return (
    <div className={`${actionType === "message" ? "" : ""}`}>
      <div
        className={`friend-item-action`}
        onClick={clickHandler}
        onMouseEnter={showHandler(itemId)}
        onMouseLeave={leaveHandler}
      >
        {icon}
      </div>

      {showModal && currentModal === itemId && (
        <ActionToolTip
          top={top}
          left={left}
          onClose={() => setShowModal(false)}
        >
          <span className="tooltip">{tooltipText}</span>
        </ActionToolTip>
      )}

      {showDeleteFriendModal && (
        <ServerFormModal onClose={closeDeleteForm}>
          <DeleteFriendForm
            friendId={itemId}
            friendName={name}
            onClose={closeDeleteForm}
          />
        </ServerFormModal>
      )}
    </div>
  );
};

export default ActionIcon;
