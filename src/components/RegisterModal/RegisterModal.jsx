import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onSubmit, onClose, handleToggle }) => {
  const defaultValues = { name: "", email: "", password: "", avatar: "" };
  const { values, handleChange, handleReset } = useForm(defaultValues);

  const isFormValid =
    values.name.trim() !== "" &&
    values.email.trim() !== "" &&
    values.password.trim() !== "" &&
    values.avatar.trim() !== "";

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values, handleReset);
  }

  return (
    <ModalWithForm
      name="register"
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
      buttonText="Sign Up"
      altText="or Log In"
      isButtonDisabled={!isFormValid}
      handleToggle={handleToggle}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Enter name here"
          required
          minLength="1"
          maxLength="30"
          value={values.name || ""}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-email" className="modal__label">
        Email{""}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Enter Email here"
          required
          minLength="1"
          maxLength="30"
          value={values.email || ""}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{""}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="Enter Password here"
          required
          minLength="1"
          maxLength="30"
          value={values.password || ""}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar{""}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Enter Avatar URL here"
          required
          minLength="1"
          maxLength="30"
          value={values.avatar || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
