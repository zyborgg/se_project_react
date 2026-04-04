import closeButton from "../../assets/closeButton.svg";
import "./DeleteConfirmationModal.css";

export function DeleteConfirmationModal({
  handleCardDelete,
  onClose,
  isOpen,
  openConfirmationModal,
}) {
  return (
    <div
      className={`delete__modal modal ${isOpen && "modal_is-opened"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="delete__modal_content">
        <button onClick={onClose} type="button" className="delete__modal_close">
          {" "}
          <img src={closeButton} alt="close modal" />
        </button>
        <div className="delete__modal_text_container">
          <h2 className="delete__modal-title">
            Are you sure you want to delete this item?
          </h2>
          <p className="delete__modal-text"> This action is irreversible.</p>
        </div>
        <div className="modal__button_container">
          <button
            onClick={handleCardDelete}
            type="button"
            className="delete__button"
          >
            {" "}
            Yes, delete item
          </button>
          <button
            onClick={onClose}
            type="button"
            className="delete__cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
