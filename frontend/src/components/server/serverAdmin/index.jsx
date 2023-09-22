import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ServerFormModal } from "../../modal/modal";
import Overview from "./serverOverview";
import DeleteForm from "./deleteServer";
import ChannelOverview from "./channelOverview";
import "./serverAdmin.css";
import {
  getServerAdminTab,
  setServerAdminTab,
  setServerFormSlide,
} from "../../../store/ui";
import { getChannel } from "../../../store/channel";

const ServerAdminPage = ({ serverInfo, channelSettingsId, onClose }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(getServerAdminTab);
  const [showModal, setShowModal] = useState(false);

  document.title = `Concordia | ${selectedTab} | ${serverInfo.name}`;

  const channelInfo = useSelector(getChannel(channelSettingsId));

  const adminOptions = document.querySelectorAll(".admin-sidebar-option");
  let selectedOption = null;
  adminOptions.forEach((option) => {
    if (option.innerHTML === selectedTab) {
      selectedOption = option;
      selectedOption.classList.add("selected");
    }
  });

  useEffect(() => {
    return () => dispatch(setServerAdminTab("Overview"));
  }, []);

  const getAdminContent = () => {
    switch (selectedTab) {
      case "Overview":
        return channelInfo ? (
          <ChannelOverview channelInfo={channelInfo} />
        ) : (
          <Overview serverInfo={serverInfo} />
        );
      default:
        return null;
    }
  };

  const handleOptionClick = (e) => {
    e.preventDefault();
    const tabName = e.target.innerText;
    if (tabName !== selectedTab) {
      selectedOption.classList.remove("selected");
      dispatch(setServerAdminTab(tabName));
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeForm = () => {
    const serverFormModal = document.querySelector(".modal-content");
    dispatch(setServerFormSlide("close"));
    serverFormModal.addEventListener(
      "animationend",
      (e) => {
        setShowModal(false);
      },
      { once: true }
    );
  };

  return (
    <div className="admin-page-wrapper">
      <div className="admin-sidebar-wrapper">
        <div className="admin-sidebar">
          <div className="admin-sidebar-options-wrapper">
            <div className="admin-sidebar-option-header">
              {channelInfo ? `# ${channelInfo.name}` : serverInfo.name}
            </div>
            <div className="admin-sidebar-option" onClick={handleOptionClick}>
              Overview
            </div>
            <div className="admin-sidebar-divider" />
            <div
              className="admin-sidebar-option icon-option"
              onClick={handleDelete}
            >
              {channelInfo ? "Delete Channel" : "Delete Server"}
              <svg role="img" width="16" height="16" viewBox="0 0 24 24">
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
          </div>
        </div>
      </div>
      <div className="admin-content-wrapper">
        <div className="admin-content">{getAdminContent()}</div>
        <div className="admin-escape-option-wrapper">
          <div className="admin-escape-option" onClick={onClose}>
            <div className="escape-icon-container">
              <svg role="img" width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                ></path>
              </svg>
            </div>
            <div className="escape-text">ESC</div>
          </div>
        </div>
      </div>

      {showModal && (
        <ServerFormModal onClose={closeForm}>
          <DeleteForm
            serverInfo={serverInfo}
            channelInfo={channelInfo}
            onClose={closeForm}
            adminClose={onClose}
          />
        </ServerFormModal>
      )}
    </div>
  );
};
export default ServerAdminPage;
