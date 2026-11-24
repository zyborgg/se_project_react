import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import "../../vendor/fonts.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { showcaseOwnerId } from "../../utils/constants";

function Main({
  clothingItems,
  weatherData,
  handleCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Logged-out visitors see the site owner's wardrobe as a showcase.
  const visibleItems =
    isLoggedIn || !showcaseOwnerId
      ? clothingItems
      : clothingItems.filter((item) => item.owner === showcaseOwnerId);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} °/ You May want to
          wear:
        </p>
        {!isLoggedIn && (
          <p className="cards__note">
            Showing a sample wardrobe. Sign up to build your own.
          </p>
        )}
        <ul className="cards__list">
          {visibleItems
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
      </section>
    </main>
  );
}

export default Main;
