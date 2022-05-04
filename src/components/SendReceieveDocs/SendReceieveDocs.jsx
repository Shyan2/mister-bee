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

const width = 700;
const height = 300;

const sizeValue = (d) => d['Count'];
const maxRadius = 50;
const minRadius = 10;

const dateHistogramSize = 0.1;
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
				const tempRadius = sizeScale(sizeValue(item));
				tempRadius > minRadius ? (item.radius = tempRadius) : (item.radius = minRadius);

				//prevent the circle from being too small
				// if (tempRadius > minRadius) {
				// 	item.radius = tempRadius;
				// } else {
				// 	item.radius = minRadius;
				// }

				finalResult.push(item);
			});
		}
		return finalResult;
	};

	return (
		<Box sx={{ ml: 1, mt: 1, mr: 1 }}>
			<DateRangeContext.Provider value={selectedDateRangeValue}>
				<StackedDateHistogram
					className="stackedDateHistogram"
					data={data}
					height={dateHistogramSize * windowHeight}
					width={windowWidth - 100}
					xValue={xValue}
					setBrushExtent={setBrushExtent}
				/>
				<Grid container spacing={2}>
					<Grid item sm={5}>
						<InfoCards data={filteredData} brushExtent={brushExtent} />
						<Grid container>
							<Grid item lg={6}>
								<Box
									sx={{ mt: 1 }}
									style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
								>
									<Typography variant="h4" fontWeight="bold">
										公文類型
									</Typography>

									<div id="container">
										<svg id="container-svg" width={innerWidth} height={windowHeight / 3.5}></svg>
										<div id="tooltip"></div>
									</div>
								</Box>
							</Grid>

							<Grid item lg={6}>
								<Typography
									style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
									variant="h4"
									fontWeight="bold"
								>
									收發文數量
								</Typography>
								<Pie data={ProcessPieData(filteredData)} innerWidth={innerWidth} innerHeight={windowHeight / 3.5} />
							</Grid>
						</Grid>

						<Box style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
							<Typography variant="h4" fontWeight="bold">
								發文單位
							</Typography>
							<Barchart width={innerWidth} height={innerHeight} data={ProcessBarData(filteredData)} />
						</Box>
					</Grid>
					<Grid item sm={12} md={12} lg={7} xl={7}>
						<DataTable data={filteredData} />
					</Grid>

					{/* <Grid item sm={12} md={6} lg={6}></Grid>

					<Grid item sm={12} md={6} lg={6}></Grid> */}
				</Grid>

				<CirclePacking data={ProcessCirclesData(filteredData)} width={innerWidth} height={windowHeight / 3.5} />
			</DateRangeContext.Provider>
		</Box>
	);
};

export default SendReceieveDocs;
