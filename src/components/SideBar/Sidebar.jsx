import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ setActiveModal, onClick, onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        {/* Avatar or fallback initial */}
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="User avatar"
            className="sidebar__avatar"
          />
        ) : (
          <span className="sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </span>
        )}
        {/* Username */}
        <p className="sidebar__username">{currentUser?.name}</p>
        {/* Edit Profile */}
        <button
          className="profile__edit-button"
          onClick={() => setActiveModal("edit-profile")}
        >
          Edit profile
        </button>
        {/* Sign Out */}
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
