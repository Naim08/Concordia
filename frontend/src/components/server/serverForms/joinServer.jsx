import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getErrors, removeErrors } from "../../../store/errors";
import { createMember } from "../../../store/member";
import { getCurrentUser } from "../../../store/session";
import {
  getNewServer,
  getServerSlide,
  setServerFormPage,
  setServerFormSlide,
  setShowServerModal,
} from "../../../store/ui";

const JoinServerForm = () => {
  const dispatch = useDispatch();

  const sessionuser = useSelector(getCurrentUser);
  const newServer = useSelector(getNewServer);
  const slide = useSelector(getServerSlide);
  const errors = useSelector(getErrors);
  const [serverId, setServerId] = useState("");

  useEffect(() => {
    const inputEle = document.querySelector(".server-form-input");
    inputEle.focus();

    return () => {
      if (errors) dispatch(removeErrors());
    };
  }, []);

  useEffect(() => {
    if (newServer) {
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
    }
  }, [newServer]);

  const closeForm = (e) => {
    e.preventDefault();

    const serverFormModal = document.querySelector(".modal-content");
    dispatch(setServerFormSlide("close"));
    serverFormModal.addEventListener(
      "animationend",
      (e) => {
        dispatch(setShowServerModal(false));
        dispatch(setServerFormPage("start"));
      },
      { once: true }
    );
  };

  const handleBack = () => {
    dispatch(setServerFormPage("start"));
    dispatch(setServerFormSlide("left"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors) dispatch(removeErrors());

    const memberData = {
      serverId,
      memberId: sessionuser.id,
    };

    dispatch(createMember(memberData));
  };

  return (
    <div className={`server-form join-create ${slide}`}>
      <div className="server-form-header">
        <h1>Join a Server</h1>
        <div className="server-form-subtext small">
          Enter a server id below to join an existing server
        </div>
        <div className="server-form-close" onClick={closeForm}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
            ></path>
          </svg>
        </div>
      </div>
      <form className="server-form-input-wrapper" onSubmit={handleSubmit}>
        <h2 className={`input-label ${errors ? "error" : ""}`}>
          SERVER ID NUMBER
          {errors ? (
            <span className="error-message server">
              {" "}
              - {Object.values(errors)}
            </span>
          ) : (
            <span className="required">*</span>
          )}
        </h2>
        <input
          type="text"
          className="server-form-input"
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
          required
        />
        <div className="helper-text">
          Demo server ids should range from 1-20
        </div>
        <div className="helper-text">
          Server ids can also be found in the url link (e.g: /server/:server_id)
        </div>
      </form>
      <div className="server-form-footer">
        <div className="back-link" onClick={handleBack}>
          Back
        </div>
        <button className="server-form-submit" onClick={handleSubmit}>
          Join Server
        </button>
      </div>
    </div>
  );
};

export default JoinServerForm;
