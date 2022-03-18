import React, { useState, useMemo } from 'react';
import { DateRangeContext } from './Context';
import { Typography, Box } from '@mui/material';
import { useData } from './useData';

import DateHistogram from './DateHistogram/DateHistogram';
import InfoCards from './InfoCards';
import Pie from './Pie';
import DataTable from './DataTable/DataTable';

const width = 850;
const height = 650;
const innerRadius = 100;
const outerRadius = 200;

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

	return (
		<Box sx={{ m: 2 }}>
			<DateRangeContext.Provider value={selectedDateRangeValue}>
				<DataTable data={filteredData} />
				<Pie
					data={ProcessPieData(filteredData)}
					width={innerWidth}
					height={innerHeight}
					innerWidth={innerWidth}
					innerHeight={innerHeight}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
				/>
				<svg width={width} height={dateHistogramSize * height}>
					<DateHistogram
						data={data}
						height={dateHistogramSize * height}
						width={width}
						xValue={xValue}
						setBrushExtent={setBrushExtent}
					/>
				</svg>
				<Box sx={{ mt: 3 }}>
					<InfoCards data={filteredData} brushExtent={brushExtent} />
				</Box>
			</DateRangeContext.Provider>
		</Box>
	);
};

export default SendReceieveDocs;
