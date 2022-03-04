import React from 'react';
import PieChart from './PieChart/PieChart';
import BarChart from './BarChart/BarChart';

import { Grid, Container } from '@mui/material';

const Dashboard = () => {
	return (
		<Grid container>
			<Grid item sm={12} md={12} lg={6}>
				<PieChart />
			</Grid>
			<Grid item sm={12} md={12} lg={6}>
				<BarChart />
			</Grid>
		</Grid>
	);
};

export default Dashboard;
