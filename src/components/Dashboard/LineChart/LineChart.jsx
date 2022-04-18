import React from 'react';
import { csv, scaleLinear, scaleTime, min, max, extent, timeFormat, timeParse } from 'd3';

import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = {
	top: 20,
	right: 50,
	bottom: 70,
	left: 80,
};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 55;

const LineChart = () => {
	const data = useData();

	if (!data) {
		return <pre>Loading ...</pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = (d) => d.date;
	const xAxisLabel = 'Date';

	const yValue = (d) => d.value;
	const yAxisLabel = 'Value';

	const xAxisTickFormat = timeFormat('%m/%d/%Y');

	const xScale = scaleTime()
		// .domain([min(data, xValue), max(data, xValue)])
		.domain(extent(data, xValue))
		.range([0, innerWidth])
		.nice(); //end point are nice numbers. Scale domain values end on suitable values for tickmarks.

	const yScale = scaleLinear().domain(extent(data, yValue)).range([innerHeight, 0]).nice();

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickoffset={8} />
				<text
					className="axis-label"
					// x={-yAxisLabelOffset}
					// y={innerHeight / 2}
					textAnchor="middle"
					transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90) `}
				>
					{yAxisLabel}
				</text>
				<AxisLeft yScale={yScale} innerWidth={innerWidth} tickoffset={8} />
				<text className="axis-label" x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor="middle">
					{xAxisLabel}
				</text>
				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					tooltipFormat={xAxisTickFormat}
					circleRadius={3}
				/>
			</g>
		</svg>
	);
};

export default LineChart;
