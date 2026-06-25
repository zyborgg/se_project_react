import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/WTWRLogo.svg";
import avatar from "../../assets/Avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLogin,
  onClick,
  setActiveModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="WTWR logo" className="header__logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__right-section">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add Clothes
        </button>
        {currentUser && currentUser.name ? (
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">
                <span className="header__avatar-placeholder">
                  {currentUser.name.charAt(0)}
                </span>
                {currentUser.name}
              </p>
            </div>
          </NavLink>
        ) : (
          <div className="header__auth-buttons">
            <button className="header__login-button" onClick={handleLogin}>
              Log In
            </button>

            <button
              className="header__register-button"
              onClick={() => onClick("register")}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
