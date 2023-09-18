import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setServerFormSlide, getServerSlide } from "../../store/ui";
import "./modal.css";

const ModalContext = React.createContext();

export function ServerFormModal({ onClose, children }) {
  const slide = useSelector(getServerSlide);
  const dispatch = useDispatch();

  useEffect(() => {
    if (slide === "close") dispatch(setServerFormSlide("expand"));

    const escListener = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", escListener);

    return () => {
      document.removeEventListener("keydown", escListener);
      dispatch(setServerFormSlide("expand"));
    };
  }, []);

  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="modal-form">
      <div className="modal-form-background" onClick={onClose} />
      <div
        className={`modal-content ${
          slide === "expand" || slide === "close" ? slide : ""
        }`}
      >
        {children}
      </div>
    </div>,
    modalNode
  );
}

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}
