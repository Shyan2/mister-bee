import React, { useRef } from 'react';
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from 'd3';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const margin = {
	top: 20,
	right: 30,
	bottom: 80,
	left: 50,
};
const xAxisLabelOffset = 55;

const Barchart = ({ width, height, data, onHover, hoveredValue, fadeOpacity, selectedValue, onSelect }) => {
	if (!data) {
		return <pre>Loading...</pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = (d) => d.revitCategory;
	const yValue = (d) => d.Count;

	const siFormat = format('.2s');

	const xScale = scaleBand().domain(data.map(xValue)).range([0, innerWidth]).paddingInner(0.15);

	const yScale = scaleLinear()
		.domain([0, max(data, yValue)])
		.range([innerHeight, 0])
		.nice();

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom xScale={xScale} innerHeight={innerHeight} />

				<AxisLeft yScale={yScale} innerWidth={innerWidth} />
				{/* <text className="axis-label" x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor="middle">
					Count
				</text> */}
				{/* <g opacity={selectedValue ? fadeOpacity : 1}> */}
				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					onHover={onHover}
					hoveredValue={hoveredValue}
					fadeOpacity={fadeOpacity}
					selectedValue={selectedValue}
					onSelect={onSelect}
					innerHeight={innerHeight}
				/>
				{/* </g> */}
				{/* <Marks
					data={filteredData}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					onHover={onHover}
					hoveredValue={hoveredValue}
					fadeOpacity={fadeOpacity}
				/> */}
			</g>
		</svg>
	);
};

export default Barchart;
