import React from 'react';
import { arc, scaleLinear, format } from 'd3';

const Gauge = ({ data, value = 20, min = 0, max = 100, label, units }) => {
	console.log(data);

	const backgroundArc = arc()
		.innerRadius(0.65)
		.outerRadius(1)
		.startAngle(-Math.PI / 2)
		.endAngle(Math.PI / 2)();
	// .cornerRadius(1)

	const percentScale = scaleLinear().domain([min, max]).range([0, 1]);
	const percent = percentScale(value);

	const angleScale = scaleLinear()
		.domain([0, 1])
		.range([-Math.PI / 2, Math.PI / 2])
		.clamp(true);

	const angle = angleScale(percent);

	const filledArc = arc()
		.innerRadius(0.65)
		.outerRadius(1)
		.startAngle(-Math.PI / 2)
		.endAngle(angle)();
	// .cornerRadius(1)

	const colorScale = scaleLinear().domain([0, 1]).range(['#F6BDC0', '#DC1C13']);

	const gradientSteps = colorScale.ticks(20).map((value) => colorScale(value));

	const markerLocation = getCoordsOnArc(angle, 1 - (1 - 0.65) / 2);

	return (
		<div
			style={{
				textAlign: 'center',
			}}
		>
			<svg style={{ overflow: 'visible' }} width="20em" viewBox={[-1, -1, 2, 1].join(' ')}>
				<defs>
					<linearGradient id="Gauge__gradient" gradientUnits="userSpaceOnUse" x1="-1" x2="1" y2="0">
						{gradientSteps.map((color, index) => (
							<stop key={color} stopColor={color} offset={`${index / (gradientSteps.length - 1)}`} />
						))}
					</linearGradient>
				</defs>
				<path d={backgroundArc} fill="#F6BDC0" />
				<path d={filledArc} fill="url(#Gauge__gradient)" />
				<line y1="-1" y2="-0.65" stroke="white" strokeWidth="0.027" />

				<circle
					cx={markerLocation[0]}
					cy={markerLocation[1]}
					r="0.15"
					stroke="#2c3e50"
					strokeWidth="0.01"
					fill={colorScale(percent)}
				/>

				<path
					d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
					// d="M40.5209 33.4001C19.8208 52.1001 2.72085 68.3001 1.82085 70.2001C-0.779151 75.0001 -0.579151 82.9001 2.32085 87.1001C8.72085 96.7001 21.1208 98.6001 29.0209 91.2001C31.6209 88.7001 79.2209 -0.0999099 77.8209 9.01264e-05C77.6209 9.01264e-05 60.9209 15.1001 40.5209 33.4001Z"
					transform={`rotate(${angle * (180 / Math.PI)}) translate(-0.2, -0.33)`}
					fill="black"
				/>
				<ellipse xmlns="http://www.w3.org/2000/svg" cx="18.5" cy="77" rx="8.5" ry="8" fill="#F9423A" />
			</svg>

			{/* <div
				style={{
					marginTop: '0.4em',
					fontSize: '3em',
					lineHeight: '1em',
					fontWeight: '900',
					fontFeatureSettings: "'zero', 'tnum' 1",
				}}
			>
				{format(',')(value)}
			</div> */}

			{!!label && (
				<div
					style={{
						color: '#8b8ba7',
						marginTop: '0.6em',
						fontSize: '1.3em',
						lineHeight: '1.3em',
						fontWeight: '700',
					}}
				>
					{label}
				</div>
			)}

			{!!units && (
				<div
					style={{
						color: '#8b8ba7',
						lineHeight: '1.3em',
						fontWeight: '300',
					}}
				>
					{units}
				</div>
			)}
		</div>
	);
};

const getCoordsOnArc = (angle, offset = 10) => [
	Math.cos(angle - Math.PI / 2) * offset,
	Math.sin(angle - Math.PI / 2) * offset,
];

export default Gauge;
