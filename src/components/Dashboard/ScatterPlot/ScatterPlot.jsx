import React from 'react';
import { csv, scaleBand, scaleLinear, min, max, extent, format, scaleOrdinal } from 'd3';

import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const circleRadius = 2.5;

const width = 960;
const height = 500;
const margin = {
	top: 20,
	right: 200,
	bottom: 70,
	left: 80,
};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;

const ScatterPlot = () => {
	const data = useData();

	if (!data) {
		return <pre>Loading ...</pre>;
	}
	console.log(data);

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = (d) => +d.GrLivArea;
	const yValue = (d) => +d.SalePrice;

	const colorValue = (d) => d.GrLivArea;

	const xScale = scaleLinear()
		// .domain([min(data, xValue), max(data, xValue)])
		.domain([0, max(data, xValue)])
		.range([0, innerWidth])
		.nice(); //end point are nice numbers. Scale domain values end on suitable values for tickmarks.

	const yScale = scaleLinear().domain(extent(data, yValue)).range([innerHeight, 0]);

	const colorScale = scaleOrdinal().domain(data.map(colorValue)).range(['#E6842A']);

	const siFormat = format('.2s');
	const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B');

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickoffset={6} />

				<AxisLeft yScale={yScale} innerWidth={innerWidth} tickoffset={6} />

				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					colorScale={colorScale}
					xValue={xValue}
					yValue={yValue}
					colorValue={colorValue}
					tooltipFormat={xAxisTickFormat}
					circleRadius={circleRadius}
				/>
			</g>
		</svg>
	);
};

export default ScatterPlot;
