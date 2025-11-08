function formatTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = days[date.getDay()];
  let month = months[date.getMonth()];
  let monthday = date.getDate();

  return `${weekday}, ${month} ${monthday}`;
}

function refreshWeather(response) {
  // temperature and weather element
  let tempElement = document.querySelector("#temp");
  let currentDescriptionElement = document.querySelector(
    "#current-description"
  );

  let temp = Math.round(response.data.temperature.current);
  let currentDescription = response.data.condition.description;
  tempElement.innerHTML = temp;
  currentDescriptionElement.innerHTML = currentDescription;

  // icon
  let iconElement = document.querySelector("#temp-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  //   humidity, wind, feels like temperature elements
  let humidityElement = document.querySelector("#humidity-percent");
  let windElement = document.querySelector("#wind-speed");
  let feelsLikeTempElement = document.querySelector("#feels-like-temp");
  let humiditiy = Math.round(response.data.temperature.humidity);
  let wind = Number.parseFloat(response.data.wind.speed).toFixed(1);
  let tempFeelsLike = Math.round(response.data.temperature.feels_like);
  humidityElement.innerHTML = humiditiy;
  windElement.innerHTML = wind;
  feelsLikeTempElement.innerHTML = tempFeelsLike;

  //  date and time
  // let date = new Date(response.data.time * 1000);
  let date = new Date();
  let currentTimeElement = document.querySelector("#current-time");
  let currentDateElement = document.querySelector("#current-date");
  currentTimeElement.innerHTML = formatTime(date);
  currentDateElement.innerHTML = formatDate(date);
}

function searchCity(city) {
  let apiKey = "1o02ad6aa40e7b19fa37f8t5928ba37d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchForm(event) {
  event.preventDefault();

  //   Get input city from the form
  let searchInput = document.querySelector("#search-input");
  console.log(searchInput.value);
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;

  //   Query data for the input city
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchForm);

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="forecast-day">
    <div class="forecast-date">${day}</div>
    <div class="forecast-icon">🌤️</div>
    <div class="forecast-temperatures">
      <div class="forecast-temperature">
        <strong>15º</strong>
      </div>
      <div class="forecast-temperature">9º</div>
    </div>
  </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

// Load default city
searchCity("Stockholm");

// Display forecast
displayForecast();
