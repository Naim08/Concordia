import "./EditOptions.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ActionToolTip, ServerFormModal } from "../../../../modal/modal";
import { deleteMessage } from "../../../../../store/message";
import {
  getQuickDelete,
  setEditMessageId,
  setServerFormSlide,
} from "../../../../../store/ui";
import MessageDeleteForm from "../EditMessageForms/DeleteMessageForm";

const MessageEditOptions = ({ messageId, message, date, extraTimeInfo }) => {
  const dispatch = useDispatch();

  const quickDelete = useSelector(getQuickDelete);
  const [disabled, setDisabled] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const showHandler = (type) => (e) => {
    e.preventDefault();

    if (document.activeElement?.nodeName !== "TEXTAREA") {
      document.getSelection().removeAllRanges();
    }

    setCurrentModal(type);
    setShowModal(true);

    const offsetY = 40;
    let offsetX = 13;
    if (type === "edit") offsetX = 5;

    const rect = e.currentTarget.getBoundingClientRect();
    setTop(rect.y - offsetY);
    setLeft(rect.x - offsetX);
  };

  const leaveHandler = (e) => {
    if (e.type !== "wheel") e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (disabled) return;

    if (quickDelete) {
      if (document.activeElement?.nodeName !== "TEXTAREA") {
        document.getSelection().removeAllRanges();
      }

      setDisabled(true);
      dispatch(deleteMessage(messageId));
    } else {
      setShowDeleteModal(true);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!disabled) dispatch(setEditMessageId(messageId));
  };

  const closeDeleteForm = () => {
    const serverFormModal = document.querySelector(".modal-content");
    dispatch(setServerFormSlide("close"));
    serverFormModal.addEventListener(
      "animationend",
      (e) => {
        setShowDeleteModal(false);
      },
      { once: true }
    );
  };

  return (
    <>
      <div className="message-options-container">
        <div
          className="edit-container message-option"
          onClick={handleEdit}
          onMouseOver={showHandler("edit")}
          onMouseLeave={leaveHandler}
          onWheel={leaveHandler}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        {showModal && currentModal === "edit" && (
          <ActionToolTip
            top={top}
            left={left}
            onClose={() => setShowModal(false)}
          >
            <span className="tooltip">Edit</span>
          </ActionToolTip>
        )}

        <div
          className={`delete-container message-option ${
            quickDelete ? "quick-delete" : ""
          }`}
          onClick={handleDelete}
          onMouseOver={showHandler("delete")}
          onMouseLeave={leaveHandler}
          onWheel={leaveHandler}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"
            ></path>
            <path
              fill="currentColor"
              d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"
            ></path>
          </svg>
        </div>

        {showModal && currentModal === "delete" && (
          <ActionToolTip
            top={top}
            left={left}
            onClose={() => setShowModal(false)}
          >
            <span className="tooltip">Delete</span>
          </ActionToolTip>
        )}
      </div>

      {showDeleteModal && (
        <ServerFormModal onClose={closeDeleteForm}>
          <MessageDeleteForm
            messageId={messageId}
            message={message}
            date={date}
            extraTimeInfo={extraTimeInfo}
            onClose={closeDeleteForm}
          />
        </ServerFormModal>
      )}
    </>
  );
};

export default MessageEditOptions;
