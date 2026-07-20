import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import "../../vendor/fonts.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  clothingItems,
  weatherData,
  handleCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} °/ You May want to
          wear:
        </p>
        {isLoggedIn ? (
          <ul className="cards__list">
            {clothingItems
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                    onCardLike={onCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                );
              })}
          </ul>
        ) : (
          <p className="cards__text-login">
            Log in to see clothing recommendations!
          </p>
        )}
      </section>
    </main>
  );
}

export default Main;
