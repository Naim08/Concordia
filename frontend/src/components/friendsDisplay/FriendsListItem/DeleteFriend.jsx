import "../../server/serverAdmin/delete.css";
import { useDispatch } from "react-redux";
import { deleteFriend } from "../../../store/friend";

const DeleteFriendForm = ({ friendId, friendName, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    onClose();
    dispatch(deleteFriend(friendId));
  };

  return (
    <div className="delete-form">
      <div className="delete-form-header">Remove '{friendName}'</div>
      <div className="delete-form-text">
        Are you sure you want to permanently remove{" "}
        <strong>{friendName}</strong> from your friends?
      </div>
      <div className="delete-form-options">
        <button className="reset-button cancel" onClick={onClose}>
          <div>Cancel</div>
        </button>
        <button className="submit-update-button delete" onClick={handleDelete}>
          <div>Remove Friend</div>
        </button>
      </div>
    </div>
  );
};

export default DeleteFriendForm;
