import React, { useState } from 'react';
import axios from 'axios';

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
			console.log(response.data);
			setWeather(response.data);
		} catch (error) {
			console.error('Error fetching weather data:', error);
		}
	};

	return (
		<div>
			<h1>Weather App</h1>
			<div className="search-box">
				<input
					type="text"
					placeholder="Enter city name"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<button onClick={handleSearch}>Search</button>
			</div>
		</div>
	);
};

export default SearchComponent;
