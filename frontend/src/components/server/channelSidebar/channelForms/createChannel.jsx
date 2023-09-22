import "../../serverAdmin/delete.css";
import "./ChannelForms.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createChannel } from "../../../../store/channel";

const CreateChannelForm = ({ serverId, onClose }) => {
  const dispatch = useDispatch();

  const [type, setType] = useState("text");
  const [name, setName] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !type) return;

    setName(name.replace(/^-/g, ""));

    const channel = {
      name,
      serverId,
      channelType: type,
    };

    dispatch(createChannel(channel));
    onClose();
  };

  const handleNameChange = (e) => {
    e.preventDefault();

    let nameInput = e.target.value;
    nameInput = nameInput
      .toLowerCase()
      .replace(/^-/g, "")
      .replace(/\s+/g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");

    setName(nameInput);
  };

  return (
    <div className="delete-form">
      <div className="delete-form-header">
        Create Channel
        <div className="cancel-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="form-input-container">
        <div className="form-input">
          <div className="overview-option-label">Channel Type</div>
          <div className="radio-list">
            <div className="radio-bar">
              <div className="radio-item-description">
                <div className="radio-channel-type-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                    ></path>
                  </svg>
                </div>
                <div className="radio-text-container">
                  <div className="radio-header">Text</div>
                  <div className="radio-description-text">
                    Send messages, emoji, opinions, and puns
                  </div>
                </div>
              </div>
              <div className="radio-icon">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="currentColor"
                  ></path>
                  <circle cx="12" cy="12" r="5" fill="currentColor"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <form className="form-input" onSubmit={handleCreate}>
          <div className="overview-option-label highlight">Channel Name</div>
          <div className="channel-name-input-wrapper">
            <div className="channel-input-type-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" role="img">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                ></path>
              </svg>
            </div>
            <input
              className="overview-input"
              value={name}
              onChange={handleNameChange}
              maxLength={100}
              placeholder={"new-channel"}
              required
            />
          </div>
        </form>
      </div>
      <div className="delete-form-options">
        <button className="reset-button cancel" onClick={onClose}>
          <div>Cancel</div>
        </button>
        <button
          className="submit-update-button create"
          onClick={handleCreate}
          disabled={!type || !name}
        >
          <div>Create Channel</div>
        </button>
      </div>
    </div>
  );
};

export default CreateChannelForm;
