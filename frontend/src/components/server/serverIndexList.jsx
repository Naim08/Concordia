import { useState } from "react";
import { ServerToolTip } from "../modal/modal";

const ServerIndexList = ({ id, image, name }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTop, setTooltipTop] = useState(0);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipTop(rect.y + 5);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="server-icon-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-key={id}
    >
      <img src={image} alt={`Server: ${name}`} className="server-icon" />

      {showTooltip && <ServerToolTip top={tooltipTop}>{name}</ServerToolTip>}
    </div>
  );
};

export default ServerIndexList;
