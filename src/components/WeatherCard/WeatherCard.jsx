import { useContext } from "react";
import sunny from "../../assets/sunny.svg";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

// TODO: Weather condition and isDay data will be used in next stage
// to display dynamic weather images based on actual conditions
// Removing it just because its not being used now doesnt make sense
function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather-card">
      <div className="weather-card-section">
        <p className="weather-card__temp">
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}{" "}
          °{currentTemperatureUnit}{" "}
        </p>
        <img src={sunny} alt="sunny temp" className="weather-card__image" />
      </div>
    </section>
  );
}

export default WeatherCard;
