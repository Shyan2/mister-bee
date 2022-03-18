import React from 'react';
import { useEffect } from 'react';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { StackedMarks } from './StackedMarks';
import { useData } from './useData';
import { Legend } from './Legend';

import { scaleBand, scaleLinear, max, scaleOrdinal, map, axisLeft, axisBottom } from 'd3';
import * as d3 from 'd3';

import { Typography } from '@mui/material';

const width = 900;
const height = 500;
const margin = {
	top: 30,
	right: 30,
	bottom: 50,
	left: 90,
};
const xAxisLabelOffset = 40;
const yAxisLabelOffset = 40;

const StackedBarChart = () => {
	const data = useData();

	useEffect(() => {
		if (data) {
			console.log(data);
		}
	}, [data]);

	if (!data) {
		return <pre>Loading ...</pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const subgroups = data.columns.slice(1);

	const groups = d3.map(data, function (d) {
		return d.docType;
	});

	const x = scaleBand().domain(groups).range([0, innerWidth]).padding([0.5]);
	// console.log(x.domain());

	const y = scaleLinear().domain([0, 120]).range([innerHeight, 0]).nice();

	const color = scaleOrdinal()
		.domain(subgroups)
		// .range(['#f9423a', '#d9d9d6', '#343e48', '#efecea', '#d8e6f0', '#1e252b', '#5B6BAA', '#AEE233']);
		.range(d3.schemeSet3);

	const stackedData = d3.stack().keys(subgroups)(data);

	return (
		<>
			<Typography sx={{ mt: 2 }} variant="h1" align="center">
				收發文數量
			</Typography>
			<svg width={width} height={height}>
				<rect width={width} height={height} fill="#f9f9f9" />
				<g transform={`translate(${margin.left},${margin.top})`}>
					<text
						className="axis-label"
						textAnchor="middle"
						transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
					>
						數量
					</text>
					<g transform={`translate(${innerWidth - 300}, 80)`}>
						<text x={35} y={-25} textAnchor="middle">
							Colour Legend
						</text>
						<Legend colorScale={color} />
					</g>
					<AxisBottom xScale={x} innerHeight={innerHeight} />

					<AxisLeft yScale={y} innerWidth={innerWidth} />
					<StackedMarks
						innerHeight={innerHeight}
						data={stackedData}
						x={x}
						y={y}
						subgroups={subgroups}
						colorScale={color}
					/>
				</g>
			</svg>
		</>
	);
};

export default StackedBarChart;
