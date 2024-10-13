// src/components/TemperatureToggle.tsx
import React, { useState } from 'react';

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
		<div>
			<button onClick={toggleScale}>
				Switch to {scale === 'C' ? 'Fahrenheit' : 'Celsius'}
			</button>
			<p className="temperature-display">
				Temperature: {convertTemperature(temp).toFixed(2)}°{scale}
			</p>
		</div>
	);
};

export default TemperatureToggle;
