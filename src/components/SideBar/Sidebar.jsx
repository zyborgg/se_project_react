import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ setActiveModal, onClick, onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__content">
        {/* Avatar + Name Row */}
        <div className="sidebar__user">
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

          <p className="sidebar__username">{currentUser?.name}</p>
        </div>

        {/* Buttons Column */}
        <div className="sidebar__actions">
          <button
            className="sidebar__button"
            onClick={() => setActiveModal("edit-profile")}
          >
            Edit Profile
          </button>

          <button
            className="sidebar__button sidebar__button_signout"
            onClick={onSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
