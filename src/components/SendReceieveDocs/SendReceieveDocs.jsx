import React, { useState, useMemo, useEffect } from 'react';
import { DateRangeContext } from './Context';
import { Typography, Box, Container, Grid } from '@mui/material';
import { useData } from './useData';

import StackedDateHistogram from './StackedDateHistogram/StackedDateHistogram';
import DateHistogram from './DateHistogram/DateHistogram';
import InfoCards from './InfoCards';
import Pie from './Pie';
import Barchart from './Barchart/Barchart';
import CirclePacking from './CirclePacking/CirclePacking';
import DataTable from './DataTable/DataTable';
import { scaleSqrt, max } from 'd3';
import { useWindowSize } from './useWindowSize';

const width = 750;
const height = 400;

const sizeValue = (d) => d['Count'];
const maxRadius = 100;

const dateHistogramSize = 0.2;
const xValue = (d) => d['RECEIVE_DATE'];

const margin = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
};

const SendReceieveDocs = () => {
	const data = useData();
	const [brushExtent, setBrushExtent] = useState();
	const [selectedDateRange, setSelectedDateRange] = useState({});

	const selectedDateRangeValue = useMemo(
		() => ({ selectedDateRange, setSelectedDateRange }),
		[selectedDateRange, setSelectedDateRange],
	);

	const [windowWidth, windowHeight] = useWindowSize();
	// console.log(windowWidth, windowHeight);

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
				let resObj = result.find((resObj) => resObj.docType === item.docType);
				resObj ? resObj.Count++ : result.push({ docType: item.docType, Count: 1 });
			});
		}
		return result;
	};

	const ProcessBarData = (inputData) => {
		let result = [];
		if (inputData) {
			inputData.forEach((item) => {
				let resObj = result.find((resObj) => resObj.sender === item.sender);
				resObj ? resObj.Count++ : result.push({ sender: item.sender, Count: 1 });
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

	return (
		<Box sx={{ ml: 2, mt: 2 }}>
			<DateRangeContext.Provider value={selectedDateRangeValue}>
				<Grid container spacing={2}>
					<Grid item sm={12}>
						{/* <DateHistogram
							className="dateHistogram"
							data={data}
							height={dateHistogramSize * height}
							width={windowWidth - 100}
							xValue={xValue}
							setBrushExtent={setBrushExtent}
						/> */}
						<StackedDateHistogram
							className="stackedDateHistogram"
							data={data}
							height={dateHistogramSize * height}
							width={windowWidth - 100}
							xValue={xValue}
							setBrushExtent={setBrushExtent}
						/>
					</Grid>

					<Grid item sm={12} md={12} lg={5}>
						<Box sx={{ mt: 0.5 }}>
							<InfoCards data={filteredData} brushExtent={brushExtent} />
							<Box
								sx={{ mt: 1 }}
								style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
							>
								<Box style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
									<Typography variant="h3" fontWeight="bold">
										公文類型
									</Typography>
								</Box>
								<div id="container">
									<svg id="container-svg" width={innerWidth} height={innerHeight}></svg>
									<div id="tooltip"></div>
								</div>
								<Typography variant="h3" fontWeight="bold">
									發文單位
								</Typography>
							</Box>

							<Barchart width={innerWidth} height={innerHeight} data={ProcessBarData(filteredData)} />
						</Box>
					</Grid>
					<Grid item sm={12} md={12} lg={12} xl={7}>
						<DataTable data={filteredData} />
					</Grid>

					<Grid item xs={8} md={6}>
						<Pie data={ProcessPieData(filteredData)} innerWidth={innerWidth} innerHeight={innerHeight} />
					</Grid>

					{/* <Grid item sm={12} md={6} lg={6}></Grid>

					<Grid item sm={12} md={6} lg={6}></Grid> */}
				</Grid>

				<CirclePacking data={ProcessCirclesData(filteredData)} width={innerWidth} height={innerHeight} />
			</DateRangeContext.Provider>
		</Box>
	);
};

export default SendReceieveDocs;
