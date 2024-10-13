import React from 'react';
import './WeatherCard.css'; // Import the CSS file for styles
import TemperatureToggle from './TemperatureToggle';

interface WeatherCardProps {
	weather: any;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
	const tempKelvin = weather.main.temp; // Assume the temperature is in Kelvin
	const location = weather.name; // Location name
	const description = weather.weather[0].description; // Weather description

	return (
		<div className="weather-card">
			<h2>{location}</h2>
			<p>{description}</p>
			<TemperatureToggle temp={tempKelvin} />
		</div>
	);
};

export default WeatherCard;
