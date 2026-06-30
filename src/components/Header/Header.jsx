import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/WTWRLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLogin,
  onClick,
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
        {isLoggedIn ? (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-button"
          >
            + Add Clothes
          </button>
        ) : null}
        {isLoggedIn && currentUser ? (
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <div className="header__username">
                <span className="header__username-text">
                  {currentUser?.name}
                </span>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="User avatar"
                    className="header__avatar"
                  />
                ) : (
                  <span className="header__avatar-placeholder">
                    {currentUser?.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
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
