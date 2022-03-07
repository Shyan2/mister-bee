import React from 'react';
import { Grid, Container } from '@mui/material';

import PieChart from './PieChart/PieChart';
import BarChart from './BarChart/BarChart';
import Gauge from './Gauge/Gauge';

const Dashboard = () => {
	return (
		<Grid container>
			<Grid item sm={12} md={12} lg={6}>
				<PieChart />
			</Grid>
			<Grid item sm={12} md={12} lg={8}>
				<BarChart />
			</Grid>
			<Grid item sm={12} md={12} lg={8}>
				<Gauge />
			</Grid>
		</Grid>
	);
};

export default Dashboard;
