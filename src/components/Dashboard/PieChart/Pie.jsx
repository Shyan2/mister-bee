import React from 'react';
import { pie, arc, scaleOrdinal, schemeSet3, format } from 'd3';
import { Legend } from './Legend';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import WSPLogo from './Asset 16.png';

const margin = {
	top: 50,
	right: 0,
	bottom: 70,
	left: 30,
};

const Arc = ({ data, index, createArc, colors, format }) => (
	<g key={index} className="arc">
		<path className="arc" d={createArc(data)} fill={colors(index)} />
		<text transform={`translate(${createArc.centroid(data)})`} textAnchor="middle" fill="black" fontSize="20">
			{data.value + '億'}
		</text>
	</g>
);

const Pie = ({ data, innerRadius, outerRadius, innerWidth, innerHeight }) => {
	const colorValue = (d) => d.name;

	const createPie = pie()
		.value((d) => d.value)
		.sort(null);

	const createArc = arc().innerRadius(innerRadius).outerRadius(outerRadius);
	const pieData = createPie(data);
	// #d8e6f0, #f9423a, #1e252b, #343e48, #d9d9d6, #efecea
	// const colors = scaleOrdinal(schemeSet3);
	const colorScale = scaleOrdinal()
		.domain(data.map(colorValue))
		.range(['#f9423a', '#d9d9d6', '#343e48', '#efecea', '#d8e6f0', '#1e252b']);

	return (
		<>
			<Typography sx={{ mt: 2 }} variant="h2" align="center">
				第二次建設計劃
			</Typography>
			<Typography variant="h2" align="center">
				【計劃經費956.81億】
			</Typography>

			<svg
				width={innerWidth}
				height={innerHeight}
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
			>
				<g transform={`translate(${margin.left},${margin.top})`}>
					<g transform={`translate(${outerRadius} ${outerRadius})`}>
						<image xlinkHref={`${WSPLogo}`} width="150" height="80" transform={`translate(-70, -20)`} />
						{pieData.map((d, i) => {
							console.log(d);
							return <Arc key={i} index={d.data.name} data={d} createArc={createArc} colors={colorScale} />;
						})}
					</g>

					<g transform={`translate(${innerWidth - 250}, ${innerHeight / 2 - 50})`}>
						<text x={35} y={-25} textAnchor="middle">
							Legend
						</text>
						<Legend colorScale={colorScale} />
					</g>
				</g>
			</svg>
		</>
	);
};

export default Pie;
