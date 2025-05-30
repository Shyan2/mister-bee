import React from 'react';
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from 'd3';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const margin = {
	top: 20,
	right: 30,
	bottom: 70,
	left: 260,
};

const Barchart = ({ width, height, data }) => {
	// console.log(data);

	if (!data) {
		return <pre>Loading...</pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const yValue = (d) => d.sender;
	const xValue = (d) => d.Count;

	const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]).paddingInner(0.15);

	const xScale = scaleLinear()
		.domain([0, max(data, xValue)])
		.range([0, innerWidth]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom xScale={xScale} innerHeight={innerHeight} />

				<AxisLeft yScale={yScale} />
				{/* <text className="axis-label" x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor="middle">
					Count
				</text> */}
				<Marks data={data} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} />
			</g>
		</svg>
	);
};

export default Barchart;
