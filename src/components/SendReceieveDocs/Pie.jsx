import React, { useState } from 'react';
import { pie, arc, scaleOrdinal, schemeSet3, format } from 'd3';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import WSPLogo from '../Assets/Asset 16.png';

const margin = {
	top: 10,
	right: 0,
	bottom: 10,
	left: 0,
};
const fadeOpacity = 0.2;
// const innerRadius = 50;
// const outerRadius = 110;

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

const Arc = ({ data, index, createArc, colors, domainValue, hoveredValue, onHover }) => (
	<g
		key={index}
		className="arc"
		opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
		onMouseEnter={() => {
			onHover(domainValue);
		}}
		onMouseOut={() => {
			onHover(null);
		}}
	>
		<path className="arc" d={createArc(data)} fill={colors(index)} />
		<text transform={`translate(${createArc.centroid(data)})`} textAnchor="middle" fill="white" fontSize="20">
			{index}
		</text>
		<title>
			{index}: {data.value}
		</title>
	</g>
);

const Pie = ({ data, innerWidth, innerHeight }) => {
	const colorValue = (d) => d.docType;
	const [hoveredValue, setHoveredValue] = useState(null);

	// const innerRadius = 50;
	// const outerRadius = 110;

	const innerRadius = innerHeight / 4.4;
	const outerRadius = innerHeight / 2.2;

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
			<svg
				width={innerWidth}
				height={innerHeight}
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
			>
				<g transform={`translate(${outerRadius + 30} ${outerRadius + 10})`}>
					<image xlinkHref={`${WSPLogo}`} width="80" height="30" transform={`translate(-45, -15)`} />

					{pieData.map((d, i) => {
						// console.log(d);
						return (
							<Arc
								key={i}
								hoveredValue={hoveredValue}
								onHover={setHoveredValue}
								index={d.data.docType}
								data={d}
								createArc={createArc}
								colors={colorScale}
								domainValue={d.data.docType}
							/>
						);
					})}
				</g>
				{/* <g transform={`translate(${innerWidth - 250}, ${innerHeight / 2 - 100})`}>
					<text x={35} y={-25} textAnchor="middle">
							Legend
						</text>
					<Legend colorScale={colorScale} />
				</g> */}
			</svg>
		</>
	);
};

export default Pie;
