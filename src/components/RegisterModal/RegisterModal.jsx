import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onSubmit, onClose }) => {
  const defaultValues = { username: "", email: "", password: "", avatar: "" };
  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values, handleReset);
  }

  return (
    <ModalWithForm
      title="Register new user"
      className={`modal modal_type_register ${isOpen ? "modal_is-opened" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Submit"
      isButtonDisabled={!isFormValid}
    >
      <label htmlFor="username" className="modal__label">
        Username{""}
        <input
          type="username"
          name="username"
          className="modal__input"
          id="username"
          placeholder="Enter Username here"
          required
          minLegnth="1"
          maxLength="30"
          value={values.username}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="Enter Email here"
          required
          minLegnth="1"
          maxLength="30"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="registerPassword" className="modal__label">
        Password{""}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="registerPassword"
          placeholder="Enter Password here"
          required
          minLegnth="1"
          maxLength="30"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar{""}
        <input
          type="imageUrl"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Enter Avatar URL here"
          required
          minLegnth="1"
          maxLength="30"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};
