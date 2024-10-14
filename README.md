# Weather App

This is a simple weather app built with **React** and **TypeScript** that integrates the **OpenWeatherMap** API for fetching real-time weather data. It provides the user with an interface to make queries by city name or click any location on the map and display the current weather conditions, including temperature, wind speed, humidity, visibility, and times for sunrise and sunset. The user can use either Celsius or Fahrenheit as the temperature unit.

## Features

- 🌍 **Map Integration**: On clicking anywhere on the map, the user should be in a position to get the weather information associated with that location.
- 🔍 **City Search**: The user can use the search bar to find any city in the world. Based on user input, the application fetches data about the weather from the OpenWeatherMap API.
- 🌡️ **Temperature Toggle**: The user can switch between Celsius and Fahrenheit, respectively, according to the user's preference.
- 🎨 **Responsive Design**: The application is fully responsive, starting from mobile views up to desktops.
- **Current Weather Data**: It displays current weather data like temperature, wind speed, humidity, visibility, and sunrise/sunset-all with visual icons for better UX.
- **Error Handling**: It handles invalid city names and API errors in case of non-responsive data.
- **End-to-End Testing**: Integrated Cypress testing for key functionalities of the app.

## Technology Stack

**_React_**: This is the main framework used to build the frontend part of the app.
**_TypeScript_**: It enables type safety - the compiler will shout at you, helping to reduce runtime errors.
**_SCSS_**: For writing modular and maintainable styles using the BEM methodology.
**_Axios_**: Handling API requests for fetching weather data.
**_Leaflet/React Leaflet_**: A library used in integrating interactive maps into the application.
**_OpenWeatherMap API_**: To get the current weather.
**_ClipLoader_**: A loader spinner from react-spinners that is used when fetching location-based weather.
**_Cypress_**: End-to-end testing framework.

## Components

### App Component:

The root wrapper of the application. It manages the state of fetched data about weather and organizes the layout, comprising SearchComponent, WeatherCard, and MapComponent.

### SearchComponent:

An input search allows users to input city names to fetch weather data. Instant validation of user input against invalid entries is implemented.

### WeatherCard:

Presents the current weather conditions extended, such as temperature, sunrise, sunset, wind speed, and more. Works with TemperatureToggle to toggle the temperature units.

### MapComponent:

An interactive map using react-leaflet to click on a position and fetch weather from that position.

### TemperatureToggle:

A simple button allows users to toggle between Celsius and Fahrenheit; conversion is done immediately.

## Setup and Installation

**Clone the repository**:

git clone https://github.com/your-username/weather-app.git
cd weather-app

**Install dependencies**:

npm install

Create a .env file in the root of the project and add your OpenWeatherMap API key:

VITE_OPENWEATHER_API_KEY=your_api_key_here

**Run the application**:

npm run dev

Open your browser and navigate to:

http://localhost:3000

## BEM (Block, Element, Modifier) Naming Convention

The styles in this project are organized using the BEM methodology. This helps create reusable and scalable styles for each component. Here are a few examples:

.weather-card**icon: The icon is an element of the weather-card block.
.search**input: The input element inside the search block.
.temperature-toggle\_\_btn: The button element inside the temperature-toggle block.

## App 
![image](https://github.com/user-attachments/assets/4460824a-beab-448c-b2ee-6098173d25d5)

##  End to End Test 

![image](https://github.com/user-attachments/assets/272bbb44-7286-4845-91a9-4e1b35ec7e67)



