# Weather App

This is a simple weather application that uses the OpenWeatherMap API to fetch and display weather information for a specified city. Users can enter the name of a city, and the app will display the current weather conditions, including temperature, description, and an icon representing the weather.

## How It Works

1. **User Input**: The user enters the name of a city into the input field.
2. **Fetch Coordinates**: The application uses the OpenWeatherMap Geocoding API to fetch the latitude and longitude of the entered city.
3. **Fetch Weather Data**: With the obtained coordinates, the application then requests the current weather data for that location from the OpenWeatherMap API.
4. **Display Weather**: The app displays the current temperature (default in Celsius), weather description, and an appropriate weather icon. Users can click on the temperature to toggle between Celsius and Fahrenheit.

## Live Demo

You can view and interact with the live demo of the Weather App by clicking [here](http://127.0.0.1:5500/weathrApp/index.html).

## Screen

<img src="./weathrApp/image/Screenshot 2024-06-18 161743.png">