let now = new Date();
let h3 = document.querySelector("#dayTime");
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h3.innerHTML = `${day} ${hours}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

function changeCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#search-text-input");
  let cityName = document.querySelector("h1");
  cityName.innerHTML = enterCity.value;
  let apikey = "c0ac58b13badefb603b7db3b6c4f7f72";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${enterCity.value}&appid=${apikey}&units=metric`;
  axios.get(`${url}&appid=${apikey}`).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempNumb = document.querySelector("#tempNumb");
  let h4 = document.querySelector("h4");
  tempNumb.innerHTML = `${temperature}`;
  h4.innerHTML = response.data.weather[0].description;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ef1f6e14d39c4aa8875abd79b5398d89&units=metric`;
  axios.get(apiEndPoint).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", getPosition);
