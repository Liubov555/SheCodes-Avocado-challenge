/* Current date*/
let nowDate = document.querySelector("#nowDate");
function dateNow(date) {
    let days = [
        "Sanday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Frieday",
        "Saturday"
    ];
    let month = [
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
        "December"
    ];
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let currentDate = date.getDate();
    let currentDay = days[date.getDay()];
    let currentMonth = month[date.getMonth()];

    return `${hour}:${minutes} - ${currentMonth} ${currentDate}, ${currentDay}`;
}
nowDate.innerHTML = dateNow(new Date);

/* Search City */
function formInput(event) {
    event.preventDefault();
    let userCity = document.querySelector("#form-input");
    let displayedCity = document.querySelector("#displayedCity");
    displayedCity.innerHTML = userCity.value;
}

let form = document.querySelector("#form");
form.addEventListener("submit", formInput);

/* Convert Celsius - Fahrenheit */
function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 72;
}
function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 22;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

/* Search city and show weather */
function showWeather(response) {
    document.querySelector("#displayedCity").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
    let apiKey = "09ed621ee119cafcd8c4f28ce97c149a";
    let innerCity = document.querySelector("#form-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showWeather);
}

function clickSubmit(event) {
    event.preventDefault();
    city = document.querySelector("#form-input").value;
    searchCity(city);
}
form.addEventListener("submit", clickSubmit);

/* Geolocation and weather */
function searchLocation(position) {
    var apiKey = "09ed621ee119cafcd8c4f28ce97c149a";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", currentLocation);
searchCity("Kyiv");

