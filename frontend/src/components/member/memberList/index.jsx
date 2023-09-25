import "./memberlist.css";
import UserIcon from "../../user/userIcon";

const MemberItem = ({ name, status, customStatus, picture }) => {
  const [username, tag] = name.split("#");

  return (
    <div className={`member-list-item`}>
      <div className="member-item-display">
        <UserIcon picture={picture} status={status} name={username} />
        <div className="member-item-details">
          <div className="member-item-name-wrapper">
            <span className="member-item-username">{username}</span>
            <span className="member-item-tag">#{tag}</span>
          </div>
          <div className="member-item-status">{customStatus}</div>
        </div>
      </div>
    </div>
  );
};

export default MemberItem;
