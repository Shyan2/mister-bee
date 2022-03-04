import React from 'react';
import { pie, arc, scaleOrdinal, schemeSet3, format } from 'd3';
import { Legend } from './Legend';
import { useEffect } from 'react';

const margin = {
	top: 20,
	right: 200,
	bottom: 70,
	left: 80,
};

const Arc = ({ data, index, createArc, colors, format }) => (
	<g key={index} className="arc">
		<path className="arc" d={createArc(data)} fill={colors(index)} />
		<text transform={`translate(${createArc.centroid(data)})`} textAnchor="middle" fill="black" fontSize="20">
			{index + ': ' + data.value}
		</text>
	</g>
);

const Pie = ({ data, innerRadius, outerRadius, width, height }) => {
	const colorValue = (d) => d.name;

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

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
		<svg width={width} height={height}>
			<g transform={`translate(${outerRadius} ${outerRadius})`}>
				{pieData.map((d, i) => {
					console.log(d);
					return <Arc key={i} index={d.data.name} data={d} createArc={createArc} colors={colorScale} />;
				})}
			</g>
			<g transform={`translate(${innerWidth}, 80)`}>
				<text x={35} y={-25} textAnchor="middle">
					Legend
				</text>
				<Legend colorScale={colorScale} />
			</g>
		</svg>
	);
};

export default Pie;
