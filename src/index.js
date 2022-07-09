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

/*Weather for the week */

function formatDay(timestempt) {
    let date = new Date(timestempt * 1000);
    let day = date.getDay();
    let days = ["San",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"];
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    forecast.forEach(function (forecastDay, index) {

        if (index < 6) {

            forecastHTML = forecastHTML + `
                <div class=" col-2 days-group">
                    <h3 class="days">
                        ${formatDay(forecastDay.dt)} 
                    </h3>
                    <img 
                      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                alt=""
                     width = "55"
                     />
                    <p class="temperature">
                    
                       ${Math.round(forecastDay.temp.max)}°C
                    </p>
                    <p class="weather">
                        ${forecastDay.weather[0].main}
                    </p>
                </div >
                `;

        }
    });


    forecastHTML = forecastHTML + `</div > `;
    forecastElement.innerHTML = forecastHTML;
}


/* Search City */
function formInput(event) {
    event.preventDefault();
    let userCity = document.querySelector("#form-input");
    let displayedCity = document.querySelector("#displayedCity");
    displayedCity.innerHTML = userCity.value;
}

let form = document.querySelector("#form");
form.addEventListener("submit", formInput);


/* Search city and show weather */

let celsiusTemperature = null;

function getForecast(coordinates) {
    let apiKey = "09ed621ee119cafcd8c4f28ce97c149a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
    console.log(response.data);
    document.querySelector("#displayedCity").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", `${response.data.weather[0].description}`);


    celsiusTemperature = response.data.main.temp;

    getForecast(response.data.coord);
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

/* Convert Celsius - Fahrenheit */

function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);



