import { useState } from "react";
import { ServerToolTip } from "../modal/modal";
import discordLogo from "../../assets/discord_logo.png";
import icons8Logo from "../../assets/icons8-discord-128.svg";

const ServerIndexList = ({ id, image, name }) => {
  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);
  if (image === "" || image === undefined) image = icons8Logo;
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

  const handleImageError = (e) => {
    e.preventDefault();
    const newIcon = document.createElement("div");
    newIcon.classList.add("server-icon");
    newIcon.classList.add("filler");
    newIcon["data-key"] = id;
    newIcon.innerText = name[0].toUpperCase();
    e.target.replaceWith(newIcon);
  };

  return (
    <>
      <div
        id={id}
        data-key={id}
        className={`server-icon-wrapper`}
        onMouseEnter={showHandler(id)}
        onMouseLeave={leaveHandler}
        onWheel={leaveHandler}
      >
        {image ? (
          <img
            className="server-icon"
            src={image}
            alt="server-icon"
            data-key={id}
            onError={handleImageError}
          />
        ) : (
          <div className="server-icon filler" data-key={id}>
            {name[0].toUpperCase()}
          </div>
        )}
      </div>
      <div className="tab-selector-wrapper">
        <span className="tab-selector" />
      </div>

      {showModal && currentModal === id && (
        <ServerToolTip top={top} onClose={() => setShowModal(false)}>
          <span className="tooltip">{name}</span>
        </ServerToolTip>
      )}
    </>
  );
};

export default ServerIndexList;
