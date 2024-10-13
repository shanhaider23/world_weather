import React, { useState } from 'react';
import axios from 'axios';
import './SearchComponent.scss';
import WeatherIcon from '../../assets/meteorology_5903803.png';
import Search from '../../assets/loupe.png';

const SearchComponent: React.FC<{ setWeather: (data: any) => void }> = ({
	setWeather,
}) => {
	const [city, setCity] = useState('');

	const handleSearch = async () => {
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
					import.meta.env.VITE_OPENWEATHER_API_KEY
				}`
			);
			setWeather(response.data);
		} catch (error) {
			console.error('Error fetching weather data:', error);
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
