import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { addItem, getItems, removeItem } from "../../utils/api";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal/DeleteConfirmationModal";
import LoginModal from "../LoginModal/LoginModal";
import { signin } from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUser, register, checkToken } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({
    _id: "",
    name: "",
    weather: "",
    imageUrl: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [onDelete, setOnDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues, handleReset) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };
    api
      .addItem(newCardData, token)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
        handleReset();
      })
      .catch(console.error);
  };

  const openConfirmationModal = (item) => {
    setActiveModal("delete__modal");
    setSelectedCard(item);
  };

  const handleCardDelete = (selectedCard) => {
    const token = localStorage.getItem("jwt");
    api
      .removeItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistration = (user) => {
    const { name, avatar, email, password } = user;
    register(user)
      .then((res) => {
        closeActiveModal();
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = (user) => {
    const { email, password } = user;
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
        console.log("USER FROM TOKEN:", user);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const handleUpdateUser = (data) => {
    updateUser(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then(({ data }) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // KEEP for now just leave commeneted out

  // useEffect(() => {
  //   if (!activeModal) {
  //     setName("");
  //     setImageUrl("");
  //     setWeather("");
  //   }
  // }, [activeModal]);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLogin={() => setActiveModal("login")}
              onClick={setActiveModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onAddClick={handleAddClick}
                    setActiveModal={setActiveModal}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <Sidebar
            onEditProfile={handleEditProfileClick}
            onSignOut={handleSignOut}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onSubmit={handleRegistration}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onSubmit={handleLogin}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            title="New Garment"
            buttonText="Add Garment"
            name="add-garment"
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSubmit={handleUpdateUser}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleCardDelete}
            openConfirmationModal={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete__modal"}
            onDelete={() => handleCardDelete(selectedCard)}
            onClose={closeActiveModal}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
