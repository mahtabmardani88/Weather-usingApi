// * https://home.openweathermap.org/api_keys
// * in github (https://github.com/carinadiesel-dev/weather-app-next/issues/1)
// * https://api.openweathermap.org/geo/1.0/direct?q=

let  isCentigrade = true;
let currentTempCentigrade = null;  //temperature centigrade

function fetchWeather() {
    const apiKey = '22b285a4117042e4e4d9f45b00c045b1'; 
    const city = document.getElementById('cityInput').value || 'Amsterdam';
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(geocodingUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Invalid API key or other error');
        })
        .then(geoData => {
            if (geoData.length === 0) {
                throw new Error('City not found.');
            }
            const { lat, lon, name, country } = geoData[0];
            getWeather(lat, lon, `${name}, ${country}`);
        })
        .catch(error => console.error('Error fetching location:', error));
}
fetchWeather();

function getWeather(lat, lon, cityName) {
    const apiKey = '22b285a4117042e4e4d9f45b00c045b1'; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Invalid API key or other error.');
        })
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message);
            }
            displayWeather(data, cityName);
        })
        .catch(error => console.error('Error fetching weather:', error));
}
getWeather();

function displayWeather(data, cityName) {
    const location = document.querySelector('.location');
    const temp = document.querySelector('.temp');
    const unit = document.querySelector('.unit');
    const description = document.querySelector('.description');
    const weatherImage = document.getElementById('weatherImage');

    location.textContent = `Weather in ${cityName}`;
    currentTempCentigrade = data.main.temp; //temperature centigrade
    temp.textContent = Math.round(currentTempCentigrade);
    unit.textContent = '°C';
    isCentigrade = true;

    description.textContent = data.weather[0].description;

    const weather = data.weather[0].main.toLowerCase();

    switch (weather) {
        case 'clear':
            weatherImage.src = 'image/sun.png';
            break;
        case 'clouds':
            weatherImage.src = 'image/cloudy.png';
            break;
        case 'rain':
            weatherImage.src = 'image/raining.png';
            break;
        case 'thunderstorm':
            weatherImage.src = 'image/storm.png';
            break;
        case 'drizzle':
            weatherImage.src = 'image/cloud.png';
            break;
        case 'snow':
            weatherImage.src = 'image/snow.png';
            break;
        default:
            weatherImage.src = '';
            break;
    }
}
displayWeather();

function toggleTemperature() {
    const temp = document.querySelector('.temp');
    const unit = document.querySelector('.unit');

    if (isCentigrade) {
        // Convert to Fahrenheit
        const fahrenheitTemp = (currentTempCentigrade * 9 / 5) + 32;
        temp.textContent = Math.round(fahrenheitTemp);
        unit.textContent = '°F';
    } else {
        // Convert to Celsius
        temp.textContent = Math.round(currentTempCentigrade);
        unit.textContent = '°C';
    }

    isCentigrade = !isCentigrade;
}
toggleTemperature();

function fetchCitySuggestions() {
    const apiKey = '22b285a4117042e4e4d9f45b00c045b1';
    const city = document.getElementById('cityInput').value;

    if (city.length < 3) {
        document.getElementById('suggestions').innerHTML = '';
        return;
    }

    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    fetch(geocodingUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Invalid API key or other error.');
        })
        .then(geoData => {
            const suggestionsDiv = document.getElementById('suggestions');
            suggestionsDiv.innerHTML = '';

            geoData.forEach(location => {
                const suggestion = document.createElement('div');
                suggestion.textContent = `${location.name}, ${location.country}`;
                suggestion.onclick = () => {
                    document.getElementById('cityInput').value = `${location.name}, ${location.country}`;
                    suggestionsDiv.innerHTML = '';
                    fetchWeather();
                };
                suggestionsDiv.appendChild(suggestion);
            });
        })
        .catch(error => console.error('Error fetching suggestions:', error));
}
fetchCitySuggestions();

document.addEventListener('DOMContentLoaded', fetchWeather);
document.querySelector('.temperature').addEventListener('click', toggleTemperature);