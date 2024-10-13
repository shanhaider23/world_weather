import React, { useState } from 'react';
import axios from 'axios';
import './SearchComponent.scss';
import WeatherIcon from '../../assets/meteorology_5903803.png';
import Search from '../../assets/loupe.png';

// Define the structure of the weather data received from the API
interface WeatherData {
	coord: {
		lon: number;
		lat: number;
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		}
	];
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	name: string;
	dt: number;
	id: number;
	cod: number;
}

interface SearchComponentProps {
	setWeather: (data: WeatherData) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ setWeather }) => {
	const [city, setCity] = useState<string>(''); // Strongly type `city` as a string

	const handleSearch = async () => {
		if (!city.trim()) return; // Prevent empty searches

		try {
			// Strong typing for the API response
			const response = await axios.get<WeatherData>(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
					import.meta.env.VITE_OPENWEATHER_API_KEY
				}`
			);
			setWeather(response.data); // Pass the weather data to the parent component
		} catch (error) {
			// Improved error handling
			if (axios.isAxiosError(error)) {
				console.error('Error fetching weather data:', error.message);
			} else {
				console.error('Unexpected error:', error);
			}
		}
	};

	return (
		<div className="search-wrapper">
			<div className="search-title">
				<img src={WeatherIcon} alt="Weather" className="weather-icon" />
				<h1>Weather App</h1>
			</div>

			<div className="search-box">
				<input
					type="text"
					placeholder="Enter city name"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<button onClick={handleSearch}>
					<img src={Search} alt="Search" className="search-icon" />
				</button>
			</div>
		</div>
	);
};

export default SearchComponent;
