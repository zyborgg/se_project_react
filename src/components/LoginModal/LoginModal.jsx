import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

import "./LoginModal.css";

const LoginModal = ({ isOpen, onSubmit, onClose, handleToggle }) => {
  const defaultValues = { email: "", password: "" };
  const { values, handleChange, handleReset } = useForm(defaultValues);
  const isFormValid =
    values.email.trim() !== "" && values.password.trim() !== "";

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values);
    useEffect(() => {
      if (isOpen) {
        handleReset();
      }
    }, [isOpen]);
  }

  return (
    <ModalWithForm
      title="Login"
      name="login"
      className={`modal modal_type_login ${isOpen ? "modal_is-opened" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
      altText="or Sign Up"
      isButtonDisabled={!isFormValid}
      handleToggle={handleToggle}
    >
      <label htmlFor="login-email" className="modal__label">
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        <input
          type="password"
          name="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          required
          minLength="1"
          maxLength="30"
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
