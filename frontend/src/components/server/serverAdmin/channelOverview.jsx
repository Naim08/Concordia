import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChannel } from "../../../store/channel";
import { getErrors, removeErrors } from "../../../store/errors";
import "./serverOverview.css";

const ChannelOverview = ({ channelInfo }) => {
  const dispatch = useDispatch();

  const [channelName, setChannelName] = useState(channelInfo.name);
  const [change, setChange] = useState(false);

  const nameHeader = document.querySelector(".admin-sidebar-option-header");
  const errors = useSelector(getErrors);

  useEffect(() => {
    if (change) window.addEventListener("resize", adjustSubmitReset);
    else window.removeEventListener("resize", adjustSubmitReset);

    return () => window.removeEventListener("resize", adjustSubmitReset);
  }, [change]);

  useEffect(() => {
    return () => dispatch(removeErrors());
  }, []);

  const handleNameChange = (e) => {
    e.preventDefault();

    setChange(true);
    setChannelName(e.target.value);
    if (nameHeader) {
      if (e.target.value) nameHeader.innerText = `# ${e.target.value}`;
      else nameHeader.innerText = "#";
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

    setChannelName(channelInfo.name);
    nameHeader.innerText = `# ${channelInfo.name}`;
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

    const newChannelInfo = {};
    if (channelName !== channelInfo.name) newChannelInfo.name = channelName;

    const response = await dispatch(
      updateChannel(newChannelInfo, channelInfo.id)
    );
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
        <div className="overview-header">Overview</div>
        <div className="overview-update-container">
          <div className="overview-server-name-container channel">
            <div className="overview-option-label">Channel Name</div>
            <input
              className="overview-input"
              id="server-name-change"
              value={channelName}
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

export default ChannelOverview;
