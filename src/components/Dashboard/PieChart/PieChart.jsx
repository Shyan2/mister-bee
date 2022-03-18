import React, { useState, useEffect } from 'react';
import { useData } from './useData';
import { useSheetData } from './useSheetData';
import Pie from './Pie';

const width = 850;
const height = 650;
const innerRadius = 100;
const outerRadius = 200;

const margin = {
	top: 100,
	right: 50,
	bottom: 70,
	left: 100,
};

const PieChart = () => {
	const data = useData();
	const sheetData = useSheetData();

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	useEffect(() => {
		console.log(data);
	}, [data]);

	useEffect(() => {
		console.log(sheetData);
	}, [sheetData]);

	if (!data) {
		return <pre>Loading...</pre>;
	}

	if (!sheetData) {
		return <pre>Loading...</pre>;
	}

	return (
		<>
			<Pie
				data={sheetData}
				width={innerWidth}
				height={innerHeight}
				innerWidth={innerWidth}
				innerHeight={innerHeight}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
			/>
		</>
	);
};

export default PieChart;
