const form = document.getElementById("form");
const input = document.getElementById("input");
const main = document.getElementById("main");
const body = document.querySelector("body");

const api = {
  baseUrl: "https://api.openweathermap.org/data/2.5/",
  token: "285626c52bc5984e8f493290b404f4ec",
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value;
  if (city) {
    getWeatherData(city);
  }
  input.value = "";
});

function getWeatherData(city) {
  fetch(`${api.baseUrl}weather?q=${city}&appid=${api.token}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      createWeatherCard(response);
    })
    .catch((err) => {
      createErrorCard("Enter a valid city name");
    });
}

function createWeatherCard(response) {
  let desc = response.weather[0].main;
  let now = new Date();
  let date = dateBuilder(now);
  body.style.background = `url("images/${desc}.jpg") no-repeat`;
  body.style.backgroundPosition = "center";
  body.style.backgroundSize = "100%";
  const cardHTML = `
      <div id="card">
        <div class="weather-info">
        <h2 id="location">${response.name},${response.sys.country}</h2>
        <p id="date">${date}</p>
        <h1 id="temp">${
          Math.round(response.main.temp) - 273
        }<span>&deg;C</span></h1>
        <p id="desc">${desc}</p>
        <p id="max-min">${Math.round(response.main.temp_min) - 273}&deg;C/${
    Math.round(response.main.temp_max) - 273
  }&deg;C</p>
          </div>
          </div>
      
    `;
  main.innerHTML = cardHTML;
}

function createErrorCard(data) {
  const cardHTML = `<div id="card">
        <div class="weather-info">
        <h2>${data}</h2>
          </div>`;
  main.innerHTML = cardHTML;
}

function dateBuilder(currentDate) {
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
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();

  return `${day} ${date},${year} ${month}`;
}
