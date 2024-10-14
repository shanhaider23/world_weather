import React, { useState } from 'react';
import './TemperatureToggle.scss';
import toggleIcon from '../../assets/f_c-512.webp';

interface TemperatureToggleProps {
	temp: number;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ temp }) => {
	const [scale, setScale] = useState<'C' | 'F'>('C');

	const toggleScale = (): void => {
		setScale((prevScale) => (prevScale === 'C' ? 'F' : 'C'));
	};

	const convertTemperature = (kelvinTemp: number): number => {
		return scale === 'C'
			? kelvinTemp - 273.15
			: ((kelvinTemp - 273.15) * 9) / 5 + 32;
	};

	return (
		<div className="temperature-toggle">
			<h1 className="temperature-toggle__display">
				{convertTemperature(temp).toFixed(2)}°{scale}
			</h1>
			<button
				className="temperature-toggle__btn"
				title="Click to toggle between Celsius and Fahrenheit"
				onClick={toggleScale}
				aria-label="Toggle temperature scale"
			>
				<img
					src={toggleIcon}
					alt="Toggle Temperature"
					className="temperature-toggle__icon"
				/>
			</button>
		</div>
	);
};

export default TemperatureToggle;
