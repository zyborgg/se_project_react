function DeleteConfirmationModal({
  openConfirmationModal,
  handleDelete,
  onClick,
  isOpen,
}) {
  return (
    <div className="delete__modal">
      <button onClick={onClose} type="button" className="deleteModal__close">
        {" "}
        <img src={closeButton} alt="close modal" />
        Are you sure you want to delete this item? This action is irreversible.
        <button className="delete__confirm">Yes, delete item</button>
        <button className="delete__cancel">Cancel</button>
      </button>
    </div>
  );
}
