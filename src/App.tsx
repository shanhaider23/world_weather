import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import SearchComponent from './components/SearchComponent';
import TemperatureToggle from './components/TemperatureToggle';
import WeatherCard from './components/WeatherCard';

import './App.css';

const App: React.FC = () => {
	const [weather, setWeather] = useState<any>(null);

	return (
		<div className="app">
			<div className="sidebar">
				<SearchComponent setWeather={setWeather} />

				{weather && <WeatherCard weather={weather} />}
			</div>
			<div className="map">
				<MapComponent />
			</div>
		</div>
	);
};

export default App;
