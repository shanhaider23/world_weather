import React, { useState } from 'react';
import SearchComponent from './components/Search/SearchComponent';
import WeatherCard from './components/Weather/WeatherCard';
import MapComponent from './components/Map/MapComponent';
import './styles/App.scss';

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
	visibility?: number;
	name: string;
	dt: number;
	id: number;
	cod: number;
}

const App: React.FC = () => {
	const [weather, setWeather] = useState<WeatherData | null>(null);

	return (
		<div className="app">
			<div className="app__sidebar">
				<SearchComponent setWeather={setWeather} />
				{weather && <WeatherCard weather={weather} />}
			</div>
			<div className="app__map">
				<MapComponent setWeather={setWeather} />
			</div>
		</div>
	);
};

export default App;
