import React from 'react';
import { pie, arc, scaleOrdinal, schemeSet3, format } from 'd3';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import WSPLogo from '../Assets/Asset 16.png';

const margin = {
	top: 50,
	right: 0,
	bottom: 70,
	left: 30,
};

const innerRadius = 100;
const outerRadius = 200;

const Legend = ({ colorScale, tickSpacing = 20, tickSize = 10, tickTextOffset = 15 }) => {
	const returnObject = colorScale.domain().map((domainValue, i) => {
		// const returnObject = colorScale.map((domainValue, i) => {
		return (
			<g key={domainValue} className="tick" transform={`translate(0,${i * tickSpacing})`}>
				<circle fill={colorScale(domainValue)} r={tickSize} />
				<text x={tickTextOffset} dy=".32em">
					{domainValue}
				</text>
			</g>
		);
	});

	return returnObject;
};

const Arc = ({ data, index, createArc, colors, format }) => (
	<g key={index} className="arc">
		<path className="arc" d={createArc(data)} fill={colors(index)} />
		<text transform={`translate(${createArc.centroid(data)})`} textAnchor="middle" fill="black" fontSize="20"></text>
		<title>
			{index}: {data.value}
		</title>
	</g>
);

const Pie = ({ data, innerWidth, innerHeight }) => {
	const colorValue = (d) => d.docType;

	const createPie = pie()
		.value((d) => d.Count)
		.sort(null);

	const createArc = arc().innerRadius(innerRadius).outerRadius(outerRadius);
	const pieData = createPie(data);
	// #d8e6f0, #f9423a, #1e252b, #343e48, #d9d9d6, #efecea
	// const colors = scaleOrdinal(schemeSet3);
	const colorScale = scaleOrdinal().domain(data.map(colorValue)).range(['#343e48', '#f9423a']);

	return (
		<>
			{/* <Typography sx={{ mt: 2 }} variant="h2" align="center">
				【收文數量】
			</Typography> */}

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
							// console.log(d);
							return <Arc key={i} index={d.data.docType} data={d} createArc={createArc} colors={colorScale} />;
						})}
					</g>
					<g transform={`translate(${innerWidth - 250}, ${innerHeight / 2 - 100})`}>
						{/* <text x={35} y={-25} textAnchor="middle">
							Legend
						</text> */}
						<Legend colorScale={colorScale} />
					</g>
				</g>
			</svg>
		</>
	);
};

export default Pie;
