import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ setActiveModal, onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__username">{currentUser?.name}</p>
        <button
          className="profile__edit-button"
          onClick={() => setActiveModal("edit-profile")}
        >
          Edit profile
        </button>
        <button
          className="sidebar__button sidebar__button_signout"
          onClick={onSignOut}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
