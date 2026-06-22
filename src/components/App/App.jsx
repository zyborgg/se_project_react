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
import AddItemModal from "../AddItemModal/AddItemModal";
import { addItem, getItems, removeItem } from "../../utils/api";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal/DeleteConfirmationModal";

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

  // KEEP in case future project phases do need this and the useEffect with it
  // leaving it commented out for now
  // const [name, setName] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  // const [weather, setWeather] = useState("");
  const [onDelete, setOnDelete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };
    addItem(newCardData)
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
    removeItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
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
      setIsLoading(false);
      return;
    }

    checkToken(token);
  }, []);

  // useEffect(() => {
  //   const handleSignIn = (e) => {
  //     if (isSignedIn) {
  //       route to something
  //     }
  //   }
  // })

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
  );
}

export default App;
