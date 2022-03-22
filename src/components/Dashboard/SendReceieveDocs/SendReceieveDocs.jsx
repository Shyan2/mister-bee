import React, { useState, useMemo, useEffect } from 'react';
import { DateRangeContext } from './Context';
import { Typography, Box, Container, Grid } from '@mui/material';
import { useData } from './useData';

import DateHistogram from './DateHistogram/DateHistogram';
import InfoCards from './InfoCards';
import Pie from './Pie';
import Barchart from './Barchart/Barchart';
import CirclePacking from './CirclePacking/CirclePacking';
import DataTable from './DataTable/DataTable';
import { scaleSqrt, max } from 'd3';

const width = 850;
const height = 650;
const innerRadius = 100;
const outerRadius = 200;

const sizeValue = (d) => d['Count'];
const maxRadius = 100;

const dateHistogramSize = 0.2;
const xValue = (d) => d['RECEIVE_DATE'];

const margin = {
	top: 100,
	right: 50,
	bottom: 70,
	left: 100,
};

const SendReceieveDocs = () => {
	const data = useData();
	const [brushExtent, setBrushExtent] = useState();
	const [selectedDateRange, setSelectedDateRange] = useState({});

	const selectedDateRangeValue = useMemo(
		() => ({ selectedDateRange, setSelectedDateRange }),
		[selectedDateRange, setSelectedDateRange],
	);

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	// useEffect(() => {
	// 	console.log(data);
	// }, [data]);

	if (!data) {
		return <pre>Loading...</pre>;
	}

	const filteredData = brushExtent
		? data.filter((d) => {
				const date = xValue(d);
				return date > brushExtent[0] && date < brushExtent[1];
		  })
		: data;

	const ProcessPieData = (inputData) => {
		let result = [];
		if (inputData) {
			inputData.forEach((item) => {
				let resObj = result.find((resObj) => resObj.DELIVER_UNIT === item.DELIVER_UNIT);
				resObj ? resObj.Count++ : result.push({ DELIVER_UNIT: item.DELIVER_UNIT, Count: 1 });
			});
		}
		return result;
	};

	const ProcessCirclesData = (inputData) => {
		let result = [];
		let finalResult = [];

		if (inputData) {
			inputData.forEach((item) => {
				let resObj = result.find((resObj) => resObj.DELIVER_LETTER_TYPE === item.DELIVER_LETTER_TYPE);
				resObj ? resObj.Count++ : result.push({ DELIVER_LETTER_TYPE: item.DELIVER_LETTER_TYPE, Count: 1 });
			});

			const sizeScale = scaleSqrt()
				.domain([0, max(result, sizeValue)])
				.range([0, maxRadius]);

			result.forEach((item) => {
				// item.size = +item.Count / 2;
				// item.size < 3 ? (item.radius = 3) : (item.radius = item.size);
				item.radius = sizeScale(sizeValue(item));
				finalResult.push(item);
			});
		}

		return finalResult;
	};
	ProcessCirclesData(filteredData);
	return (
		<Box sx={{ m: 2 }}>
			<DateRangeContext.Provider value={selectedDateRangeValue}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<DateHistogram
							data={data}
							height={dateHistogramSize * height}
							width={1800}
							xValue={xValue}
							setBrushExtent={setBrushExtent}
						/>
					</Grid>

					<Grid item xs={12}>
						<Box sx={{ mt: 3 }}>
							<InfoCards data={filteredData} brushExtent={brushExtent} />
						</Box>
					</Grid>

					{/* <Grid item xs={8} md={6}>
						<Pie
							data={ProcessPieData(filteredData)}
							width={innerWidth}
							height={innerHeight}
							innerWidth={innerWidth}
							innerHeight={innerHeight}
							innerRadius={innerRadius}
							outerRadius={outerRadius}
						/>
					</Grid> */}

					<Grid item xs={6}>
						<Barchart data={ProcessPieData(filteredData)} />
					</Grid>

					<Grid item xs={6}>
						<div id="container">
							<svg id="container-svg" width={innerWidth} height={innerHeight}></svg>
							<div id="tooltip"></div>
						</div>
					</Grid>
				</Grid>

				<CirclePacking data={ProcessCirclesData(filteredData)} width={innerWidth} height={innerHeight} />

				<DataTable data={filteredData} />
			</DateRangeContext.Provider>
		</Box>
	);
};

export default SendReceieveDocs;
