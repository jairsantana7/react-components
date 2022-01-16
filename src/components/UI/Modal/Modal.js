//import { createPortal } from "react-dom";
import reactDom from "react-dom";
import "../../UI/Modal/Modal.css";

const UIModal = ({ isOpen, children, onClickClose }) => {
  //const portal = null;
  const portalRoot = document.getElementById("portal-root");

  if (!isOpen) {
    return null;
  }

  return reactDom.createPortal(
    <div className="ui-modal__overlay">
      <div className="ui-modal">
        <button
          className="ui-modal__close-button"
          type="button"
          onClick={onClickClose}
        >
          x
        </button>
        {children}
      </div>
    </div>,
    portalRoot
  );
};

export default UIModal;
