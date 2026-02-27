export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};
// API key: 7b91b37495f6d1e1992eddad7d0372b8

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(data.main.temp);
  return result;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) return "hot";
  else if (temperature >= 66) return "warm";
  else return "cold";
};
