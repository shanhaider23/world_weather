import React, { useState } from 'react';
import MapComponent from './components/Map/MapComponent';
import SearchComponent from './components/Search/SearchComponent';
import WeatherCard from './components/Weather/WeatherCard';

import './styles/App.scss';

const App: React.FC = () => {
	const [weather, setWeather] = useState<any>(null); // State shared by Search and Map

	return (
		<div className="app">
			<div className="sidebar">
				<SearchComponent setWeather={setWeather} />
				{weather && <WeatherCard weather={weather} />}
			</div>
			<div className="map">
				<MapComponent setWeather={setWeather} />
			</div>
		</div>
	);
};

export default App;
