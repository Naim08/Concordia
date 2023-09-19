import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  getDeletedServerId,
  getNewServer,
  getSelectedServer,
  getShowServerModal,
  setDeletedServerId,
  setNewServer,
  setServerFormPage,
  setServerFormSlide,
  setShowServerModal,
  setSelectedServer,
} from "../../store/ui";

import {
  addServer,
  fetchServers,
  getServers,
  removeServer,
  resetServers,
} from "../../store/server";

import { ServerFormModal, ServerToolTip } from "../modal/modal";
import CreateServerForm from "./createServer";
import ServerIndexList from "./serverIndexList";
import "./serverSideBar.css";
import consumer from "../../consumer";

const ServerSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serverId } = useParams();
  const selectedServer = useSelector(getSelectedServer);
  const selectedServers = useSelector(getServers);

  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);

  const showServerModal = useSelector(getShowServerModal);
  const [currentModal, setCurrentModal] = useState(null);

  const newServer = useSelector(getNewServer);
  const deletedServerId = useSelector(getDeletedServerId);

  useEffect(() => {
    dispatch(fetchServers());

    return () => {
      dispatch(resetServers());
    };
  }, [dispatch]);

  useEffect(() => {
    if (newServer) {
      navigate(`servers/${newServer}`);
      dispatch(setNewServer(false));
    }
  }, [newServer]);

  useEffect(() => {
    if (deletedServerId) {
      if (parseInt(serverId) === deletedServerId) {
        navigate("/home");
      }
      dispatch(setDeletedServerId(null));
    }
  }, [deletedServerId]);

  useEffect(() => {
    if (serverId) {
      dispatch(setSelectedServer(serverId));
    }
    const subscription = consumer.subscriptions.create(
      { channel: "ServersChannel", id: serverId },
      {
        received: ({ type, member, channel, id }) => {
          switch (type) {
            case "UPDATE_MEMBER":
              dispatch(addMember(member));
              break;
            case "DELETE_MEMBER":
              dispatch(removeMember(id));
              dispatch(removeUserMessages(id));
              break;
            case "ADD_MEMBER":
              dispatch(addMember(member));
              break;
            case "ADD_CHANNEL":
              dispatch(addChannel(channel));
              break;
            case "DELETE_CHANNEL":
              dispatch(removeChannel(id));
              dispatch(setDeletedChannelId(id));
              break;
            case "UPDATE_CHANNEL":
              dispatch(addChannel(channel));
              break;
            default:
            // console.log("unknown broadcast type");
          }
        },
      }
    );

    return () => {
      subscription?.unsubscribe();
      // dispatch(resetChannels());
      //   dispatch(resetMembers());
    };
  }, [serverId]);
  const toggleSelected = (e) => {
    if (e.target.dataset.key) {
      if (e.target.dataset.key === "home") navigate(`/home`);
      else if (e.target.dataset.key === "add-server") return;
      else navigate(`/server/${e.target.dataset.key}`);
    }
  };

  const checkSelected = (id) => {
    if (selectedServer === id.toString()) return "selected";
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
        dispatch(setServerFormPage("start"));
        dispatch(setServerFormSlide("expand"));
      },
      { once: true }
    );
  };

  const handleShowForm = () => {
    dispatch(setShowServerModal(true));
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

      {selectedServers.map((server) => {
        return (
          <div
            className={`server-item-wrapper ${checkSelected(server.id)}`}
            key={server.id}
          >
            <ServerIndexList
              id={server.id}
              image={server.pictureUrl}
              name={server.name}
            />
          </div>
        );
      })}

      <div
        className={`server-item-wrapper ${showServerModal ? "selected" : ""}`}
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

      {showServerModal && (
        <ServerFormModal onClose={closeForm}>
          <CreateServerForm />
        </ServerFormModal>
      )}
    </div>
  );
};

export default ServerSideBar;
