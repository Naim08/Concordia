import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateServer } from "../../../store/server";
import { getErrors, removeErrors } from "../../../store/errors";
import "./serverOverview.css";

const Overview = ({ serverInfo }) => {
  const dispatch = useDispatch();

  const [serverName, setServerName] = useState(serverInfo.name);
  const [picture, setPicture] = useState();
  const [picturePreview, setPicturePreview] = useState();
  const [imageRemoved, setImageRemoved] = useState(false);
  const [change, setChange] = useState(false);

  const nameHeader = document.querySelector(".admin-sidebar-option-header");
  const errors = useSelector(getErrors);

  useEffect(() => {
    if (!picture) {
      setPicturePreview(undefined);
      return;
    }

    const pictureObject = URL.createObjectURL(picture);
    setPicturePreview(pictureObject);

    return () => URL.revokeObjectURL(pictureObject);
  }, [picture]);

  useEffect(() => {
    if (change) window.addEventListener("resize", adjustSubmitReset);
    else window.removeEventListener("resize", adjustSubmitReset);

    return () => window.removeEventListener("resize", adjustSubmitReset);
  }, [change]);

  useEffect(() => {
    return () => dispatch(removeErrors());
  }, []);

  const handleImageRemove = (e) => {
    e.preventDefault();

    const imageInputs = document.querySelectorAll(".server-form-image-input");
    imageInputs.forEach((input) => (input.value = null));
    setPicture("");
    setImageRemoved(true);
  };

  const handleImageInput = (e) => {
    e.preventDefault();
    if (!e.target.files[0]) return;

    e.target.id === "image-input-1"
      ? (document.getElementById("image-input-2").value = null)
      : (document.getElementById("image-input-1").value = null);

    setPicture(e.target.files[0]);
    setImageRemoved(false);
    setChange(true);
  };

  const imageInput = (id) => (
    <input
      className="server-form-image-input"
      type="file"
      accept=".jpg,.jpeg,.png,.gif"
      onChange={handleImageInput}
      id={`image-input-${id}`}
      disabled
    />
  );

  const handleNameChange = (e) => {
    e.preventDefault();

    setChange(true);
    setServerName(e.target.value);

    if (nameHeader) {
      if (e.target.value) nameHeader.innerText = e.target.value;
      else nameHeader.innerText = "server settings";
    }
  };

  const resetChange = (e) => {
    e.preventDefault();

    const submitReset = document.querySelector(".submit-reset-container");
    submitReset.classList.add("exit");
    submitReset.addEventListener(
      "animationend",
      (e) => {
        setChange(false);
      },
      { once: true }
    );

    setPicture(undefined);
    setImageRemoved(false);
    const imageInputs = document.querySelectorAll(".server-form-image-input");
    imageInputs.forEach((input) => (input.value = null));

    setServerName(serverInfo.name);
    nameHeader.innerText = serverInfo.name;
  };

  const getWidth = () => {
    const width = document.querySelector(".admin-content").offsetWidth;
    return width - 40;
  };

  const getLeft = () => {
    const left = document
      .querySelector(".admin-sidebar-wrapper")
      .getBoundingClientRect().right;
    return left;
  };

  const adjustSubmitReset = (e) => {
    e.preventDefault();
    const submitReset = document.querySelector(".submit-reset-container");
    submitReset.style.width = `${getWidth()}px`;
    submitReset.style.left = `${getLeft()}px`;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const newServerInfo = { id: serverInfo.id };
    formData.append("server[id]", serverInfo.id);
    if (serverName !== serverInfo.name) {
      newServerInfo.name = serverName;
      formData.append("server[name]", serverName);
    }
    if (imageRemoved && serverInfo.serverPhotoUrl) {
      newServerInfo.serverPhotoUrl = null;
      formData.append("server[serverPhotoUrl]", null);
    } else if (picture) {
      newServerInfo.serverPhotoUrl = picture;
      formData.append("server[serverPhotoUrl]", picture);
    }

    const response = await dispatch(updateServer(formData, newServerInfo));
    if (response) {
      const submitReset = document.querySelector(".submit-reset-container");
      submitReset.classList.add("exit");
      submitReset.addEventListener(
        "animationend",
        (e) => {
          setChange(false);
        },
        { once: true }
      );
    }
  };

  return (
    <>
      <div className="server-overview">
        <div className="overview-header">Server Overview</div>
        <div className="overview-update-container">
          <div className="overview-image-container">
            <div className="overview-image-icon-container">
              <div className="overview-image-icon-wrapper">
                {imageInput(1)}

                {(serverInfo.serverPhotoUrl || picture) && !imageRemoved ? (
                  <div
                    className="overview-image-preview"
                    style={{
                      backgroundImage: `url(${
                        picturePreview || serverInfo.serverPhotoUrl
                      })`,
                    }}
                    alt=""
                  />
                ) : (
                  <div className="server-icon filler overview">
                    {serverInfo.name[0].toUpperCase()}
                  </div>
                )}

                <div
                  className={`image-change-text ${
                    (serverInfo.serverPhotoUrl || picture) && !imageRemoved
                      ? "no-icon"
                      : ""
                  }`}
                >
                  Change
                  <br />
                  Icon
                </div>
                <div className="image-upload-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 18 18"
                    width="18"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="m0 0h18v18h-18z" />
                      <path
                        d="m13.5 8.25v4.5c0 .8284271-.6715729 1.5-1.5 1.5h-10.5c-.82842712 0-1.5-.6715729-1.5-1.5v-10.5c0-.82842712.67157288-1.5 1.5-1.5h7.5-3v1.5h-4.5v10.5h10.5v-4.5zm-5.28-.5325 2.655 3.5325h-8.25l2.0625-2.6475 1.47 1.77zm3.78-5.4675h2.25v1.5h-2.25v2.25h-1.5v-2.25h-2.25v-1.5h2.25v-2.25h1.5z"
                        fill="#4f545c"
                        transform="translate(2.25 1.5)"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              {(serverInfo.serverPhotoUrl || picture) && !imageRemoved ? (
                <div className="remove-image-link" onClick={handleImageRemove}>
                  Remove
                </div>
              ) : (
                <div className="image-text-helper">
                  Minimum Size: <strong>128x128</strong>
                </div>
              )}
            </div>
            <div className="overview-image-upload-container">
              <div className="overview-instruction">
                We recommend an image of at least 512x512 for the server.
              </div>
              <div className="overview-button">
                Upload Image
                {imageInput(2)}
              </div>
            </div>
          </div>
          <div className="overview-server-name-container">
            <div className="overview-option-label">Server Name</div>
            <input
              className="overview-input"
              id="server-name-change"
              value={serverName}
              onChange={handleNameChange}
              minLength={2}
              maxLength={100}
              required
            />

            {errors?.name ? (
              <span className="input-error-message">{errors.name}</span>
            ) : null}
          </div>
        </div>
      </div>

      {change ? (
        <div
          className="submit-reset-container"
          style={{ width: `${getWidth()}px`, left: `${getLeft()}px` }}
        >
          <div className="submit-reset-wrapper">
            <div className="submit-reset">
              <div className="submit-reset-text">
                Careful — you have unsaved changes!
              </div>
              <div className="submit-reset-options">
                <button className="reset-button" onClick={resetChange}>
                  Reset
                </button>
                <button className="submit-update-button" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Overview;
