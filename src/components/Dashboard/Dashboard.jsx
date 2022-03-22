import { useState } from 'react';
import { Grid, Container } from '@mui/material';

import PieChart from './PieChart/PieChart';
import BarChart from './BarChart/BarChart';
import ProgressCard from './ProgressCard/ProgressCard';
import StackedBarChart from './StackedBarChart/StackedBarChart';
import SendReceieveDocs from './SendReceieveDocs/SendReceieveDocs';
import Selection from './Selection';

const Dashboard = () => {
	const [pieChart, setPieChart] = useState(false);
	const [barChart, setBarChart] = useState(false);
	const [progressCard, setProgressCard] = useState(false);
	const [stackedBarChart, setStackedBarChart] = useState(false);
	const [sendReceieveDocs, setSendReceiveDocs] = useState(true);

	return (
		<>
			<Selection
				pieChart={pieChart}
				barChart={barChart}
				progressCard={progressCard}
				stackedBarChart={stackedBarChart}
				sendReceieveDocs={sendReceieveDocs}
				setPieChart={setPieChart}
				setBarChart={setBarChart}
				setProgressCard={setProgressCard}
				setStackedBarChart={setStackedBarChart}
				setSendReceiveDocs={setSendReceiveDocs}
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
				{sendReceieveDocs && (
					<Grid item sm={12}>
						<SendReceieveDocs />
					</Grid>
				)}
			</Grid>
		</>
	);
};

export default Dashboard;
