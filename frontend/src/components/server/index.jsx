import { ServerFormModal } from "../modal/modal";
import {
  setServerFormPage,
  setShowServerModal,
  setServerFormSlide,
} from "../../store/ui";
import CreateServerForm from "./createServer";
import { useDispatch } from "react-redux";
const ServerForm = () => {
  const dispatch = useDispatch();
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
  return (
    <ServerFormModal onClose={closeForm}>
      <CreateServerForm />
    </ServerFormModal>
  );
};

export default ServerForm;
