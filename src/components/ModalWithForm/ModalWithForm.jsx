import "./ModalWithForm.css";
import closeButton from "../../assets/closeButton.svg";

function ModalWithForm({
  isOpen,
  buttonText,
  title,
  name,
  onClose,
  onSubmit,
  isButtonDisabled,
  altText,
  handleToggle,
  children,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeButton} alt="close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-row">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className="modal__submit"
            >
              {buttonText}
            </button>
            {altText && (
              <button
                type="button"
                className="modal__toggle-text"
                onClick={handleToggle}
              >
                {altText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
