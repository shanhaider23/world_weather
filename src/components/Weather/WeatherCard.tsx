import React from 'react';
import './WeatherCard.scss';
import TemperatureToggle from '../TemperautreToggle/TemperatureToggle';
import Rise from '../../assets/sunrise.png';
import Set from '../../assets/sunset.png';
import MinT from '../../assets/thermometer_1182991.png';
import MaxT from '../../assets/thermometer_8048656.png';
import Wind from '../../assets/wind-direction_3920908.png';
import Humidity from '../../assets/humidity_11907737.png';
import Vision from '../../assets/positive-vision_11757233.png';
import Speed from '../../assets/speedometer_4328591.png';

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

interface WeatherCardProps {
	weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
	const {
		name,
		sys: { country, sunrise, sunset },
		main: { temp, temp_min, temp_max, humidity, pressure },
		weather: weatherInfo,
		wind: { speed },
		visibility,
	} = weather;

	const { description, icon } = weatherInfo[0];

	const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
	const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

	const tempMinCelsius = (temp_min - 273.15).toFixed(1);
	const tempMaxCelsius = (temp_max - 273.15).toFixed(1);

	const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

	return (
		<div className="weather-card">
			<div className="weather-card__wrapper">
				<div className="weather-card__place">
					<h1>{name}</h1>
					<h2>{country}</h2>
				</div>
				<div>
					<img src={iconUrl} alt={description} className="weather-card__icon" />
					<h2 className="weather-card__description">
						{description.charAt(0).toUpperCase() + description.slice(1)}
					</h2>
				</div>
			</div>
			<TemperatureToggle temp={temp} />

			<div className="weather-card__details">
				<div className="weather-card__details-box">
					<img src={Rise} alt="Sun rise" className="weather-card__icon-small" />
					<div className="weather-card__values">
						<h2>
							<strong>Sunrise</strong>
						</h2>
						<h2>{sunriseTime}</h2>
					</div>
				</div>
				<div className="weather-card__details-box">
					<img src={Set} alt="Sun set" className="weather-card__icon-small" />
					<div className="weather-card__values">
						<h2>
							<strong>Sunset</strong>
						</h2>
						<h2>{sunsetTime}</h2>
					</div>
				</div>
				<div className="weather-card__details-box">
					<img src={MinT} alt="Min Temp" className="weather-card__icon-small" />
					<div className="weather-card__values">
						<h2>
							<strong>Min Temp</strong>
						</h2>
						<h2>{tempMinCelsius}°C</h2>
					</div>
				</div>
				<div className="weather-card__details-box">
					<img src={MaxT} alt="Max Temp" className="weather-card__icon-small" />
					<div className="weather-card__values">
						<h2>
							<strong>Max Temp</strong>
						</h2>
						<h2>{tempMaxCelsius}°C</h2>
					</div>
				</div>
				<div className="weather-card__details-box">
					<img src={Wind} alt="Wind" className="weather-card__icon-small" />
					<div className="weather-card__values">
						<h2>
							<strong>Wind</strong>
						</h2>
						<h2>{speed} m/s</h2>
					</div>
				</div>
				<div className="weather-card__details-box">
					<img
						src={Humidity}
						alt="Humidity"
						className="weather-card__icon-small"
					/>
					<div className="weather-card__values">
						<h2>
							<strong>Humidity</strong>
						</h2>
						<h2>{humidity}%</h2>
					</div>
				</div>
				<div className="weather-card__details-box">
					<img src={Vision} alt="Vision" className="weather-card__icon-small" />
					<div className="weather-card__values">
						<h2>
							<strong>Visibility</strong>
						</h2>
						<h2>{visibility ? (visibility / 1000).toFixed(1) : 'N/A'} km</h2>
					</div>
				</div>
				<div className="weather-card__details-box">
					<img src={Speed} alt="Speed" className="weather-card__icon-small" />
					<div className="weather-card__values">
						<h2>Pressure</h2>
						<h2>{pressure} hPa</h2>
					</div>
				</div>
			</div>
			<div>
				<p className="weather-card__copyright">
					&copy; Designed and Developed by:
					<a
						className="weather-card__twitter-link"
						target="_blank"
						href="https://shanehaider.dk"
					>
						Shan-e-Haider Bukhari
					</a>
				</p>
			</div>
		</div>
	);
};

export default WeatherCard;
