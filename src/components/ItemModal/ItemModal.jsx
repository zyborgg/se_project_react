import "./ItemModal.css";
import whiteCloseButton from "../../assets/closeButtonWhite.svg";

function ItemModal({ onClose, card, isOpen }) {
  return (
    <div
      className={`modal ${isOpen && "modal_is-opened"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="itemModal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="itemModal__close">
          <img src={whiteCloseButton} alt="close modal" />
        </button>
        <img src={card.link} alt={card.name} className="itemModal__image" />
        <div className="itemModal__footer">
          <h2 className="itemModal__caption">{card.name}</h2>
          <p className="itemModal__weather">Weather: {card.weather} </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
