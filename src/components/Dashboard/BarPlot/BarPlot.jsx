import React from 'react';
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from 'd3';

import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 800;
const height = 500;
const margin = {
	top: 30,
	right: 30,
	bottom: 70,
	left: 60,
};
const xAxisLabelOffset = 55;

const BarPlot = () => {
	const data = useData();

	if (!data) {
		return <pre>Loading ...</pre>;
	}

	data.sort(function (b, a) {
		return a.Value - b.Value;
	});

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const yValue = (d) => d.Value;
	const xValue = (d) => d.Country;

	const siFormat = format('.2s');
	const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B');

	const xScale = scaleBand().domain(data.map(xValue)).range([0, innerWidth]).padding(0.2);

	const yScale = scaleLinear()
		.domain([0, max(data, yValue)])
		.range([innerHeight, 0])
		.nice();

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} />

				<AxisLeft yScale={yScale} innerWidth={innerWidth} />
				{/* <text className="axis-label" x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor="middle">
					Population
				</text> */}
				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					tooltipFormat={xAxisTickFormat}
					innerHeight={innerHeight}
				/>
			</g>
		</svg>
	);
};

export default BarPlot;
