import closeButton from "../../assets/closeButton.svg";

export function DeleteConfirmationModal({ handleDelete, onClose, isOpen }) {
  return (
    <div
      className={`delete__modal modal ${isOpen && "modal_is-opened"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="deleteModal__content">
        <button onClick={onClose} type="button" className="delete__modal_close">
          {" "}
          <img src={closeButton} alt="close modal" />
        </button>
        <h2> Are you sure you want to delete this item? </h2>
        <p> This action is irreversible.</p>
        <button onClick={handleDelete} type="button" className="delete__button">
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
  );
}
