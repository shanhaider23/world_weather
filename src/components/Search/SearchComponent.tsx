import React, { useState } from 'react';
import axios from 'axios';
import './SearchComponent.scss';
import WeatherIcon from '../../assets/meteorology_5903803.png';
import Search from '../../assets/loupe.png';

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
	const [error, setError] = useState<string | null>(null); // To handle error messages

	const handleSearch = async () => {
		if (!city.trim()) {
			setError('Please enter a city name.');
			return;
		}

		try {
			const response = await axios.get<WeatherData>(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
					import.meta.env.VITE_OPENWEATHER_API_KEY
				}`
			);
			setWeather(response.data);
			setError(null);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response && error.response.status === 404) {
					setError('City not found. Please check the spelling.');
				} else {
					setError('Error fetching weather data. Please try again later.');
				}
			} else {
				setError('Unexpected error occurred.');
			}
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
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
					onKeyDown={handleKeyPress} // Trigger search on pressing Enter
				/>
				<button onClick={handleSearch}>
					<img src={Search} alt="Search" className="search-icon" />
				</button>
			</div>

			{error && <div className="error-message">{error}</div>}
		</div>
	);
};

export default SearchComponent;
