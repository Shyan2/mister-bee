import { useState } from 'react';
import { Grid, Container } from '@mui/material';

import PieChart from './PieChart/PieChart';
import BarChart from './BarChart/BarChart';
import ProgressCard from './ProgressCard/ProgressCard';
import StackedBarChart from './StackedBarChart/StackedBarChart';
import Selection from './Selection';

const Dashboard = () => {
	const [pieChart, setPieChart] = useState(1);
	const [barChart, setBarChart] = useState(1);
	const [progressCard, setProgressCard] = useState(1);
	const [stackedBarChart, setStackedBarChart] = useState(1);

	return (
		<>
			<Selection
				pieChart={pieChart}
				barChart={barChart}
				progressCard={progressCard}
				stackedBarChart={stackedBarChart}
				setPieChart={setPieChart}
				setBarChart={setBarChart}
				setProgressCard={setProgressCard}
				setStackedBarChart={setStackedBarChart}
			/>
			<Grid container>
				{pieChart && (
					<Grid item sm={12} md={12} lg={6}>
						<PieChart />
					</Grid>
				)}
				{barChart && (
					<Grid item sm={12} md={12} lg={6}>
						<BarChart />
					</Grid>
				)}
				{progressCard && (
					<Grid item sm={12} md={12} lg={6}>
						<ProgressCard />
					</Grid>
				)}
				{stackedBarChart && (
					<Grid item sm={12} md={12} lg={6}>
						<StackedBarChart />
					</Grid>
				)}
			</Grid>
		</>
	);
};

export default Dashboard;
