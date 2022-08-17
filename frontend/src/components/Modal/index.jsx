import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#e3e3e3",
    overflowY: "scroll",
    maxHeight: "600px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
  },
};

ReactModal.setAppElement("#root");

export const Modal = ({ isOpen, onRequestClose, children, contentLabel }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles}
    contentLabel={contentLabel}
  >
    {children}
  </ReactModal>
);
