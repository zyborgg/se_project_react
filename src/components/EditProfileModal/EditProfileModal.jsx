import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const defaultValues = { name: "", avatar: "" };
  const { values, handleChange, handleReset } = useForm(defaultValues);
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values, handleReset);
  }
  return (
    <ModalWithForm
      title="Edit Profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input name="name" value={values.name} onChange={handleChange} />
      <input name="avatar" value={values.avatar} onChange={handleChange} />
    </ModalWithForm>
  );
}
