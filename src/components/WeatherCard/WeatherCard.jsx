import sunny from "../../assets/sunny.svg";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <div className="weather-card-section">
        <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
        <img src={sunny} alt="sunny temp" className="weather-card__image" />
        <> </>
      </div>
    </section>
  );
}

export default WeatherCard;
