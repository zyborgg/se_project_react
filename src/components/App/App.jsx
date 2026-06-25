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
  const [currentUser, setCurrentUser] = useState({});
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
    signup({ name, avatar, email, password })
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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openLoginModal = () => {
    setActiveModal("login");
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
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    checkToken(token);
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
              onClick={handleLogin}
              handleLogin={openLoginModal}
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
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
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
