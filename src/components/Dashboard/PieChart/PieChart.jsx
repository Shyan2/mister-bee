import React, { useState, useEffect } from 'react';
import { useData } from './useData';

import Pie from './Pie';

const width = 960;
const height = 600;
const innerRadius = 150;
const outerRadius = 280;

const PieChart = () => {
	const data = useData();

	useEffect(() => {
		console.log(data);
	}, [data]);

	if (!data) {
		return <pre>Loading...</pre>;
	}
	return (
		<>
			<Pie data={data} width={width} height={height} innerRadius={innerRadius} outerRadius={outerRadius} />
		</>
	);
};

export default PieChart;
