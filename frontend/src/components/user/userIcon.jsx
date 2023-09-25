import offlineIcon from "../../assets/icons/offline.png";
import onlineIcon from "../../assets/icons/online.png";
import idleIcon from "../../assets/icons/idle.png";
import busyIcon from "../../assets/icons/busy.png";
import dummyIcon from "../../assets/discord_logo.png";

const UserIcon = ({ picture, status, name }) => {
  let noStatus = false;
  let iconUrl;

  switch (status) {
    case "Offline":
      iconUrl = offlineIcon;
      break;
    case "Online":
      iconUrl = onlineIcon;
      break;
    case "Idle":
      iconUrl = idleIcon;
      break;
    case "Do Not Disturb":
      iconUrl = busyIcon;
      break;
    case "Invisible":
      iconUrl = offlineIcon;
      break;
    default:
      iconUrl = offlineIcon;
      noStatus = true;
  }

  const handleImageError = (e) => {
    e.preventDefault();
    const newIcon = document.createElement("div");
    newIcon.className = "filler-container";
    newIcon.innerHTML = `<div class="filler-profile-pic">
                            <img class="dummy-pic" src=${dummyIcon} alt="" />
                          </div>
                          <img
                            class="filler-status-icon"
                            src=${iconUrl}
                            alt="status"
                            visibility=${noStatus ? "hidden" : "visible"}
                          />`;
    e.target.parentNode.replaceWith(newIcon);
  };

  return (
    <div className="user-icon">
      {picture ? (
        <div className="user-profile-pic-container">
          <img
            className="user-profile-pic"
            src={picture}
            alt=""
            onError={handleImageError}
          />
          <img className="status-icon" src={iconUrl} alt="status" />
        </div>
      ) : (
        <div className="filler-container">
          <div className="filler-profile-pic">
            <i className="fa-brands fa-discord fa-spin-pulse fa-lg dummy-pic"></i>
          </div>
          <img
            className="filler-status-icon"
            src={iconUrl}
            alt="status"
            visibility={noStatus ? "hidden" : "visible"}
          />
        </div>
      )}
    </div>
  );
};

export default UserIcon;
