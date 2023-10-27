import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  getDeletedChannelId,
  getDeletedServerId,
  getNewChannel,
  getNewServer,
  getSelectedServer,
  getShowServerModal,
  setDeletedChannelId,
  setDeletedServerId,
  setNewChannel,
  setNewServer,
  setServerFormPage,
  setServerFormSlide,
  setShowServerModal,
  setJoinServerModal,
  getJoinServerModal,
} from "../../store/ui";

import {
  addServer,
  fetchServers,
  getServers,
  removeServer,
  resetServers,
} from "../../store/server";
import {
  getConversation,
  receiveConversation,
  removeConversation,
} from "../../store/conversation";

import { ServerFormModal, ServerToolTip } from "../modal/modal";
import ServerForms from "./serverForms";
import ServerIndexList from "./serverIndexList";
import "./serverSideBar.css";
import consumer from "../../consumer";

const ServerSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { serverId, channelId } = useParams();
  const selected = useSelector(getSelectedServer);
  const servers = useSelector(getServers);

  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);
  const newServerId = useSelector(getNewServer);
  const newChannelId = useSelector(getNewChannel);
  const deletedServerId = useSelector(getDeletedServerId);
  const deletedChannelId = useSelector(getDeletedChannelId);
  const showServerFormModal = useSelector(getShowServerModal);
  const showJoinServerModal = useSelector(getJoinServerModal);
  const iconColor =
    (showModal && currentModal === "join-server") || showJoinServerModal
      ? "#ffffff"
      : "#299e1a";

  useEffect(() => {
    if (servers) dispatch(fetchServers());

    const subscription = consumer.subscriptions.create(
      { channel: "UsersChannel" },
      {
        received: ({ type, server, id, conversation }) => {
          switch (type) {
            case "UPDATE_SERVER":
              dispatch(addServer(server));
              break;
            case "DELETE_SERVER":
              // console.log(type, id);
              dispatch(removeServer(id));
              dispatch(setDeletedServerId(id));
              break;
            case "ADD_CONVERSATION":
              // console.log(type, conversation, id);
              dispatch(receiveConversation(conversation));
              break;
            case "DELETE_CONVERSATION":
              dispatch(removeConversation(id));
              break;
            default:
              // console.log("unknown broadcast type");
              break;
          }
        },
      }
    );

    return () => {
      subscription?.unsubscribe();
      dispatch(resetServers());
    };
  }, [dispatch]);

  useEffect(() => {
    if (newServerId) {
      navigate(`/server/${newServerId}`);
      dispatch(setNewServer(null));
    }
  }, [newServerId]);

  useEffect(() => {
    if (newChannelId) {
      navigate(`/server/${serverId}/${newChannelId}`);
      dispatch(setNewChannel(null));
    }
  }, [newChannelId]);

  useEffect(() => {
    // console.log(serverId, deletedServerId);
    if (deletedServerId) {
      if (serverId === deletedServerId.toString()) navigate(`/home`);
      dispatch(setDeletedServerId(null));
    }
  }, [deletedServerId]);

  useEffect(() => {
    if (deletedChannelId) {
      if (channelId === deletedChannelId.toString())
        navigate(`/server/${serverId}`);
      dispatch(setDeletedChannelId(null));
    }
  }, [deletedChannelId]);

  const toggleSelected = (e) => {
    // console.log(e.target.dataset.key);
    if (e.target.dataset.key) {
      if (e.target.dataset.key === "home") navigate(`/home`);
      else if (e.target.dataset.key === "add-server") return;
      else navigate(`/server/${e.target.dataset.key}`);
    }
  };

  const checkSelected = (id) => {
    if (selected === id.toString()) return "selected";
    return "";
  };

  const showHandler = (id) => (e) => {
    e.preventDefault();
    setCurrentModal(id);
    setShowModal(true);

    const rect = e.currentTarget.getBoundingClientRect();
    setTop(rect.y + 5);
  };

  const leaveHandler = (e) => {
    if (e.type !== "wheel") e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  };

  const closeForm = () => {
    const serverFormModal = document.querySelector(".modal-content");
    dispatch(setServerFormSlide("close"));
    serverFormModal.addEventListener(
      "animationend",
      (e) => {
        dispatch(setShowServerModal(false));
        dispatch(setJoinServerModal(false));
        dispatch(setServerFormPage("start"));
        dispatch(setServerFormSlide("expand"));
      },
      { once: true }
    );
  };

  const handleShowForm = () => {
    dispatch(setShowServerModal(true));
  };
  const handleShowJoinForm = () => {
    dispatch(setJoinServerModal(true));
  };

  const handleLoad = () => {
    const selectedIcon = document.querySelector(
      ".server-item-wrapper.selected"
    );

    if (selectedIcon?.getBoundingClientRect().bottom > window.innerHeight) {
      selectedIcon.scrollIntoView(false);
    }
  };

  return (
    <div className="server-bar" onClick={toggleSelected} onLoad={handleLoad}>
      <div className={`server-item-wrapper ${checkSelected("home")}`}>
        <div
          id="home"
          data-key="home"
          className="server-icon-wrapper home-icon-wrapper"
          onMouseEnter={showHandler("home")}
          onMouseLeave={leaveHandler}
          onWheel={leaveHandler}
        >
          <i className="fa-brands fa-discord fa-beat fa-lg"></i>
        </div>
        <div className="tab-selector-wrapper">
          <span className="tab-selector" />
        </div>

        {showModal && currentModal === "home" && (
          <ServerToolTip top={top} onClose={() => setShowModal(false)}>
            <span className="tooltip">Direct Messages</span>
          </ServerToolTip>
        )}
      </div>
      <div className="server-divider" />

      {servers.map((server) => {
        return (
          <div
            className={`server-item-wrapper ${checkSelected(server.id)}`}
            key={server.id}
          >
            <ServerIndexList
              id={server.id}
              image={server.isValidPhoto ? server.serverPhotoUrl2 : server.serverPhotoUrl}
              image2={server.serverPhotoUrl2}
              name={server.name}
            />
          </div>
        );
      })}
      {Object.keys(servers).length !== 0 && <div className="server-divider" />}
      <div
        className={`server-item-wrapper ${
          showServerFormModal ? "selected" : ""
        }`}
        onClick={handleShowForm}
      >
        <div
          id="add-server"
          data-key="add-server"
          className="server-icon-wrapper add-server-icon-wrapper"
          onMouseEnter={showHandler("add-server")}
          onMouseLeave={leaveHandler}
          onWheel={leaveHandler}
        >
          <svg
            data-key="add-server"
            className="add-server-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
            ></path>
          </svg>
        </div>

        {showModal && currentModal === "add-server" && (
          <ServerToolTip top={top} onClose={() => setShowModal(false)}>
            <span className="tooltip">Add a Server</span>
          </ServerToolTip>
        )}
      </div>

      {showServerFormModal && (
        <ServerFormModal onClose={closeForm}>
          <ServerForms />
        </ServerFormModal>
      )}

      <div
        className={`server-item-wrapper ${
          showJoinServerModal ? "selected" : ""
        }`}
        onClick={handleShowJoinForm}
      >
        <div
          id="add-server"
          data-key="add-server"
          className="server-icon-wrapper add-server-icon-wrapper"
          onMouseEnter={showHandler("join-server")}
          onMouseLeave={leaveHandler}
          onWheel={leaveHandler}
        >
          <i
            className={`fa-sharp fa-solid fa-compass  ${
              (showModal && currentModal === "join-server") ||
              showJoinServerModal
                ? "fa-spin"
                : ""
            }`}
            style={{ color: iconColor }}
          ></i>
        </div>

        {showModal && currentModal === "join-server" && (
          <ServerToolTip top={top} onClose={() => setShowModal(false)}>
            <span className="tooltip">Join a Server</span>
          </ServerToolTip>
        )}
      </div>
      {/* {showJoinServerModal && (
        <ServerFormModal onClose={closeForm}>
          <ServerForms />
        </ServerFormModal>
      )} */}
    </div>
  );
};

export default ServerSideBar;
