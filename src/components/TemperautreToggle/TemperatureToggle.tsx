import React, { useState } from 'react';
import './TemperatureToggle.scss';
import toggleIcon from '../../assets/f_c-512.webp';

const TemperatureToggle: React.FC<{ temp: number }> = ({ temp }) => {
	const [scale, setScale] = useState<'C' | 'F'>('C');

	const toggleScale = () => {
		setScale(scale === 'C' ? 'F' : 'C');
	};

	const convertTemperature = (kelvinTemp: number) => {
		return scale === 'C'
			? kelvinTemp - 273.15
			: ((kelvinTemp - 273.15) * 9) / 5 + 32;
	};

	return (
		<div className="temperature-toggle">
			<h1 className="temperature-display">
				{convertTemperature(temp).toFixed(2)}°{scale}
			</h1>
			<button
				className="temperature-btn"
				title="Click to toggle between Celsius and Fahrenheit"
				onClick={toggleScale}
			>
				<img
					src={toggleIcon}
					alt="Toggle Temperature"
					className="toggle-icon"
				/>
			</button>
		</div>
	);
};

export default TemperatureToggle;
