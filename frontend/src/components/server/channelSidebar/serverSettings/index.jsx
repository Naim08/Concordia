import "./serverSettings.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../../store/session";
import {
  setCreateChannelModal,
  setLeaveServerModal,
  setShowServerAdminModal,
} from "../../../../store/ui";

const ServerSettings = ({ serverInfo }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(getCurrentUser);

  const showHandler = (e) => {
    e.preventDefault();
    document.querySelector(".server-settings-dropdown").click();
    const appContainer = document.querySelector(".app-container");
    appContainer.classList.add("hide");
    dispatch(setShowServerAdminModal(true));
  };

  const handleForm = (modalSetter) => (e) => {
    e.preventDefault();
    dispatch(modalSetter(true));
    document.querySelector(".server-settings-dropdown").click();
  };

  return (
    <div className="server-settings">
      {serverInfo.ownerId === sessionUser.id ? (
        <>
          <div className="server-setting-option" onClick={showHandler}>
            <div className="option-description">Server Settings</div>
            <svg
              className="option-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              ></path>
            </svg>
          </div>
          <div
            className="server-setting-option"
            onClick={handleForm(setCreateChannelModal)}
          >
            <div className="option-description">Create Channel</div>
            <svg
              className="option-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
              ></path>
            </svg>
          </div>
        </>
      ) : (
        <div
          className="server-setting-option dangerous"
          onClick={handleForm(setLeaveServerModal)}
        >
          <div className="option-description">Leave Server</div>
          <svg
            className="option-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ServerSettings;
