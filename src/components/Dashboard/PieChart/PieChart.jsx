import React, { useState, useEffect } from 'react';
import { useData } from './useData';

import Pie from './Pie';

const width = 900;
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

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	useEffect(() => {
		console.log(data);
	}, [data]);

	if (!data) {
		return <pre>Loading...</pre>;
	}
	return (
		<>
			<Pie
				data={data}
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
