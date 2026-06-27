import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const defaultValues = {
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  };
  const { values, handleChange, setValues, handleReset } =
    useForm(defaultValues);
  const isFormValid = values.name.trim() !== "" && values.avatar.trim() !== "";

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values, handleReset);
  }
  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save Changes"
      isButtonDisabled={!isFormValid}
    >
      <label className="modal__label">
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
