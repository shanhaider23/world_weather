import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './MapComponent.scss';
import ClipLoader from 'react-spinners/ClipLoader';
import { LeafletMouseEvent } from 'leaflet';
import L from 'leaflet';

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

interface MapComponentProps {
	setWeather: (data: WeatherData) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ setWeather }) => {
	const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
		null
	);
	const [currentPosition, setCurrentPosition] = useState<
		[number, number] | null
	>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const MapClickHandler = () => {
		const map = useMap();

		useMapEvents({
			click: async (e: LeafletMouseEvent) => {
				const { lat, lng } = e.latlng;
				setMarkerPosition([lat, lng]);

				try {
					const response = await axios.get<WeatherData>(
						`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
							import.meta.env.VITE_OPENWEATHER_API_KEY
						}`
					);
					setWeather(response.data);

					const marker = L.marker([lat, lng]).addTo(map);
					const popup = L.popup()
						.setLatLng([lat, lng])
						.setContent(
							`<div class='map-box__popup-details'>
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

	if (loading) {
		return (
			<div style={{ textAlign: 'center', marginTop: '400px' }}>
				<ClipLoader size={100} color="#36D7B7" />
			</div>
		);
	}

	return (
		<div className="map-box">
			<MapContainer
				center={currentPosition || [56.672743, 12.467425]} // Fallback if geolocation fails
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
