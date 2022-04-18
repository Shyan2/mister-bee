import { useEffect } from 'react';

import { scaleBand, scaleLinear, max, scaleOrdinal, map, axisLeft, axisBottom } from 'd3';
import { useData } from './useData';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { MultiMarks } from './MultiMarks';
import { Legend } from './Legend';

import { Typography } from '@mui/material';

import * as d3 from 'd3';

const width = 700;
const height = 500;
const margin = {
	top: 30,
	right: 30,
	bottom: 50,
	left: 90,
};
const xAxisLabelOffset = 40;
const yAxisLabelOffset = 60;

const GroupedBarChart = () => {
	const data = useData();

	// useEffect(() => {
	//   console.log(data);
	// }, [data]);

	if (!data) {
		return <pre>Loading ... </pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const yValue = (d) => d['MFB'];
	const xValue = (d) => d['Year'];

	/// START GROUPED BARPLOT

	const subgroups = data.columns.slice(1);

	const groups = d3.map(data, xValue);

	// X axis
	const x = scaleBand().domain(groups).range([0, innerWidth]).padding([0.5]);

	// console.log(x.domain());

	//Y axis
	const y = scaleLinear()
		.domain([0, max(data, yValue)])
		.range([innerHeight, 0])
		.nice();

	//subgroup
	const xSubgroup = scaleBand().domain(subgroups).range([0, x.bandwidth()]).padding([0.05]);

	const color = scaleOrdinal()
		.domain(subgroups)
		.range(['#f9423a', '#d9d9d6', '#343e48', '#efecea', '#d8e6f0', '#1e252b']);

	/// END GROUPED BARPLOT

	const yScale = scaleLinear()
		.domain([0, max(data, yValue)])
		.range([innerHeight, 0])
		.nice();

	// const xScale = scaleBand().domain(data.map(xValue)).range([0, innerWidth]).padding(0.2);

	return (
		<>
			{/* <svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}>
					<AxisBottom xScale={xScale} innerHeight={innerHeight} />

					<AxisLeft yScale={yScale} innerWidth={innerWidth} />
					<text className="axis-label" x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor="middle">
						Year
					</text>
					<Marks innerHeight={innerHeight} data={data} xScale={xScale} yScale={yScale} />
				</g>
			</svg> */}
			{/* <Typography sx={{ mt: 2 }} variant="h1" align="center">
				TP6A_鋼構進場數量
			</Typography> */}
			<svg width={width} height={height}>
				{/* <rect width={width} height={height} fill="#f9f9f9" /> */}
				<g transform={`translate(${margin.left},${margin.top})`}>
					<AxisBottom xScale={x} innerHeight={innerHeight} />

					<text
						className="axis-label"
						textAnchor="middle"
						transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
					>
						Units
					</text>

					<AxisLeft yScale={yScale} innerWidth={innerWidth} />
					<text className="axis-label" x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor="middle">
						Year
					</text>
					<MultiMarks
						innerHeight={innerHeight}
						data={data}
						x={x}
						y={y}
						subgroups={subgroups}
						xSubgroup={xSubgroup}
						color={color}
					/>
				</g>
				<g transform={`translate(${innerWidth - 80} , 80)`}>
					<text x={35} y={-25} textAnchor="middle">
						Colour Legend
					</text>
					<Legend colorScale={color} />
				</g>
			</svg>
		</>
	);
};

export default GroupedBarChart;
