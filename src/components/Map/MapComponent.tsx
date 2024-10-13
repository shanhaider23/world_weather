import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './MapComponent.scss';

interface MapComponentProps {
	setWeather: (data: any) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ setWeather }) => {
	const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
		null
	);
	const [currentPosition, setCurrentPosition] = useState<
		[number, number] | null
	>(null);
	const [loading, setLoading] = useState(true);

	const MapClickHandler = () => {
		const map = useMap();

		useMapEvents({
			click: async (e) => {
				const { lat, lng } = e.latlng;

				setMarkerPosition([lat, lng]);

				try {
					const response = await axios.get(
						`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
							import.meta.env.VITE_OPENWEATHER_API_KEY
						}`
					);
					setWeather(response.data); // Update weather in parent component

					// Open popup for the clicked location
					const marker = L.marker([lat, lng]).addTo(map);
					const popup = L.popup()
						.setLatLng([lat, lng])
						.setContent(
							`<div class='popup-details'>
								<h1>${response.data.name}</h1>
								<h2>Temperature: ${Math.round(response.data.main.temp - 273.15)}°C</h2>
								<h2>Condition: ${response.data.weather[0].description}</h2>
							</div>`
						)
						.openOn(map);
				} catch (error) {
					console.error('Error fetching weather data:', error);
				}
			},
		});
		return null;
	};

	// Use geolocation to get current position
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setCurrentPosition([latitude, longitude]);
					setLoading(false);
				},
				() => {
					console.error('Unable to retrieve your location');
					setLoading(false);
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
			setLoading(false);
		}
	}, []);

	// Show loading message while fetching location
	if (loading) {
		return (
			<div>
				<h1>Loading your location...</h1>
			</div>
		);
	}

	return (
		<div className="map-box">
			<MapContainer
				center={currentPosition || [56.672743, 12.467425]}
				zoom={13}
				style={{ height: '100%', width: '100%' }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<MapClickHandler />
			</MapContainer>
		</div>
	);
};

export default MapComponent;
