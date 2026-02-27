import "./ItemModal.css";
import whiteCloseButton from "../../assets/closeButtonWhite.svg";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal__is-opened"}`}>
      <div className="itemModal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="itemModal__close">
          <img src={whiteCloseButton} alt="close" />
        </button>
        <img src={card.link} alt="modal image" className="itemModal__image" />
        <div className="itemModal__footer">
          <h2 className="itemModal__caption">{card.name}</h2>
          <p className="itemModal__weather">Weather: {card.weather} </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
