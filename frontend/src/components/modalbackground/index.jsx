import modalbackground from "../../assets/LoginBackground.png";
import "./modal.css";

const ModalBackground = () => {
  return (
    <img
      className="modal-background"
      src={modalbackground}
      alt="screen-background"
    />
  );
};

export default ModalBackground;
