function formatedDate(now) {
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let years = now.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = now.getMonth() + 1;
  if (months < 10) {
    months = `0${months}`;
  }
  return `${day} ${months}/ ${date}/ ${years} ${hours}:${minutes}`;
}
let now = new Date();
let dateTime = document.querySelector(".date-and-time");
dateTime.innerHTML = formatedDate(now);

function showTemperature(response) {
  document.querySelector(".current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".city-name").innerHTML = response.data.name;;
  document.querySelector (".temp-min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector (".temp-max").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector (".humidity").innerHTML = response.data.main.humidity;
  document.querySelector (".wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector (".description").innerHTML = response.data.weather[0].main;
}

let apikey = "b8948de550c1172033028f092653f041";
let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
let units ="metric";
function search(city){
let apiUrl = `${apiEndPoint}q=${city}&appid=${apikey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);
}
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let currentApiUrl = `${apiEndPoint}lat=${latitude}&lon=${longitude}&appid=${apikey}&units=${units}`;
  console.log (currentApiUrl);
 axios.get(currentApiUrl).then(showCurrentTemperature);
 }
 function getCurrentPosition (){
  navigator.geolocation.getCurrentPosition(currentLocation);
 }

let button = document.querySelector ("button");
button.addEventListener ("click", getCurrentPosition);

function submitCity(event) {
  event.preventDefault();
  let citySubmited = document.querySelector("#city-input");
  if (citySubmited.value) {
    document.querySelector("h1").innerHTML = citySubmited.value;
  } else {
    alert("Please enter a city");
  }
  
  let newApiUrl =  `${apiEndPoint}q=${citySubmited.value}&appid=${apikey}&units=${units}`;
  axios.get(newApiUrl).then(showNewTemperature);
}

function showNewTemperature(response) {
  console.log(response.data);
  document.querySelector ("#current-temp").innerHTML= Math.round(response.data.main.temp);
  document.querySelector (".temp-min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector (".temp-max").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector (".humidity").innerHTML = response.data.main.humidity;
  document.querySelector (".wind").innerHTML = response.data.wind.speed;
  document.querySelector (".description").innerHTML = response.data.weather[0].main;
}

let cityName = document.querySelector("form");
cityName.addEventListener("submit", submitCity);

function showCelsius(event) {
  event.preventDefault();
  document.querySelector(".current-temp").innerHTML = temperature;
}
let celsiusTemp = document.querySelector(".celsius");
celsiusTemp.addEventListener("click", showCelsius);

function showFahrenheid(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(".current-temp");
  fahrenheit.innerHTML = `${temperature}*9/5+32`;
}
let fahrenheitTemp = document.querySelector(".fahrenheit");
fahrenheitTemp.addEventListener("click", showFahrenheid);
