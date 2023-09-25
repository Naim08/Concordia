import "../../../../server/serverAdmin/delete.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "../../../../../store/message";
import { getCurrentUser } from "../../../../../store/session";
import MessageItem from "..";

const MessageDeleteForm = ({
  messageId,
  message,
  date,
  extraTimeInfo,
  onClose,
}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(getCurrentUser);

  const handleDelete = (e) => {
    e.preventDefault();
    onClose();
    dispatch(deleteMessage(messageId));
  };

  return (
    <div className="delete-form">
      <div className="delete-form-header">Delete Message</div>
      <div className="delete-form-text delete-message">
        <div className="delete-text">
          Are you sure you want to delete this message?
        </div>
        <div className="delete-message-container">
          <MessageItem
            message={message}
            user={sessionUser}
            date={date}
            extraTimeInfo={extraTimeInfo}
            editDisabled={true}
          />
        </div>
        <div className="tip-container">
          <div className="pro-header">Protip:</div>
          <div className="delete-tip">
            You can hold down shift while clicking{" "}
            <strong>delete message</strong> to bypass this confirmation
            entirely.
          </div>
        </div>
      </div>
      <div className="delete-form-options">
        <button className="reset-button cancel" onClick={onClose}>
          <div>Cancel</div>
        </button>
        <button className="submit-update-button delete" onClick={handleDelete}>
          <div>Delete</div>
        </button>
      </div>
    </div>
  );
};

export default MessageDeleteForm;
