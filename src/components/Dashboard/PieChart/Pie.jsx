import React, { useState } from 'react';
import { pie, arc, scaleOrdinal, schemeSet3, format } from 'd3';
import { Legend } from './Legend';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import WSPLogo from '../../Assets/Asset 16.png';

import * as d3 from 'd3';

const fadeOpacity = 0.2;

const margin = {
	top: 50,
	right: 0,
	bottom: 70,
	left: 30,
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
		<text transform={`translate(${createArc.centroid(data)})`} textAnchor="middle" fill="black" fontSize="20">
			{data.value}
		</text>
		<title fontSize="3rem">{data.value}</title>
	</g>
);

const Pie = ({ data, innerRadius, outerRadius, innerWidth, innerHeight }) => {
	const [hoveredValue, setHoveredValue] = useState(null);

	const totalValue = data.reduce((a, { value }) => a + value, 0);
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
			{/* <Typography sx={{ mt: 2 }} variant="h2" align="center">
				第二次建設計劃
			</Typography> */}
			<Typography variant="h2" align="center">
				【計劃經費 {format('.2f')(totalValue)} 億】
			</Typography>

			<svg
				width={innerWidth}
				height={innerHeight}
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
			>
				<div id="tooltip"></div>
				<g transform={`translate(${margin.left},${margin.top})`}>
					<g transform={`translate(${outerRadius} ${outerRadius})`}>
						<image xlinkHref={`${WSPLogo}`} width="150" height="80" transform={`translate(-73, -28)`} />
						{pieData.map((d, i) => {
							return (
								<Arc
									key={i}
									index={d.data.name}
									data={d}
									createArc={createArc}
									colors={colorScale}
									hoveredValue={hoveredValue}
									onHover={setHoveredValue}
									domainValue={d.data['項目']}
								/>
							);
						})}
					</g>

					<g transform={`translate(${innerWidth - 250}, ${innerHeight / 2 - 50})`}>
						<text x={35} y={-25} textAnchor="middle">
							Legend
						</text>
						<Legend
							colorScale={colorScale}
							fadeOpacity={fadeOpacity}
							hoveredValue={hoveredValue}
							onHover={setHoveredValue}
						/>
					</g>
				</g>
			</svg>
		</>
	);
};

export default Pie;
