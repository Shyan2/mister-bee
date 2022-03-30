import { useState } from 'react';
import { Grid, Box, Container, Typography } from '@mui/material';

import DashboardMenu from './DashboardMenu';
import PieChart from './PieChart/PieChart';
import BarChart from './GroupedBarChart/GroupedBarChart';
import ProgressCard from './ProgressCard/ProgressCard';
import StackedBarChart from './StackedBarChart/StackedBarChart';
import BarPlot from './BarPlot/BarPlot';
import CircularPacking from './CircularPacking/CircularPacking';
import LineChart from './LineChart/LineChart';
import ScatterPlot from './ScatterPlot/ScatterPlot';
import TreeMap from './TreeMap/TreeMap';

import Selection from './Selection';

const Dashboard = () => {
	const [pieChart, setPieChart] = useState(() => {
		const saved = localStorage.getItem('pie');
		var isTrueSet = saved === 'true';
		return isTrueSet || false;
	});
	const [groupedBarChart, setGroupedBarChart] = useState(() => {
		const saved = localStorage.getItem('groupbar');
		var isTrueSet = saved === 'true';
		return isTrueSet || false;
	});
	const [stackedBarChart, setStackedBarChart] = useState(() => {
		const saved = localStorage.getItem('stackedbar');
		var isTrueSet = saved === 'true';
		return isTrueSet || false;
	});
	const [barPlot, setBarPlot] = useState(() => {
		const saved = localStorage.getItem('bar');
		var isTrueSet = saved === 'true';
		return isTrueSet || false;
	});

	const [lineChart, setLineChart] = useState(() => {
		const saved = localStorage.getItem('line');
		var isTrueSet = saved === 'true';
		return isTrueSet || false;
	});
	const [scatterPlot, setScatterPlot] = useState(() => {
		const saved = localStorage.getItem('scatter');
		var isTrueSet = saved === 'true';
		return isTrueSet || false;
	});

	const [circularPacking, setCircularPacking] = useState(false);
	const [treeMap, setTreeMap] = useState(false);
	const [progressCard, setProgressCard] = useState(false);
	return (
		<>
			{/* <Selection
				pieChart={pieChart}
				groupedBarChart={groupedBarChart}
				progressCard={progressCard}
				stackedBarChart={stackedBarChart}
				barPlot={barPlot}
				circularPacking={circularPacking}
				lineChart={lineChart}
				scatterPlot={scatterPlot}
				treeMap={treeMap}
				setPieChart={setPieChart}
				setGroupedBarChart={setGroupedBarChart}
				setProgressCard={setProgressCard}
				setStackedBarChart={setStackedBarChart}
				setBarPlot={setBarPlot}
				setCircularPacking={setCircularPacking}
				setLineChart={setLineChart}
				setScatterPlot={setScatterPlot}
				setTreeMap={setTreeMap}
			/> */}
			<Grid container spacing={2} justifyContent="center">
				<Grid item sm={12} sx={{ mt: 2 }}>
					<Box style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
						<Typography variant="h1">Project Insights</Typography>
						<DashboardMenu
							pieChart={pieChart}
							groupedBarChart={groupedBarChart}
							progressCard={progressCard}
							stackedBarChart={stackedBarChart}
							barPlot={barPlot}
							circularPacking={circularPacking}
							lineChart={lineChart}
							scatterPlot={scatterPlot}
							treeMap={treeMap}
							setPieChart={setPieChart}
							setGroupedBarChart={setGroupedBarChart}
							setProgressCard={setProgressCard}
							setStackedBarChart={setStackedBarChart}
							setBarPlot={setBarPlot}
							setCircularPacking={setCircularPacking}
							setLineChart={setLineChart}
							setScatterPlot={setScatterPlot}
							setTreeMap={setTreeMap}
						/>
					</Box>
				</Grid>
				{pieChart && (
					<Grid item sm={12} md={12} lg={6}>
						<PieChart />
					</Grid>
				)}
				{groupedBarChart && (
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

				{barPlot && (
					<Grid item sm={12} md={12} lg={6}>
						<BarPlot />
					</Grid>
				)}
				{circularPacking && (
					<Grid item sm={12} md={12} lg={6}>
						<CircularPacking />
					</Grid>
				)}
				{lineChart && (
					<Grid item sm={12} md={12} lg={6}>
						<LineChart />
					</Grid>
				)}
				{scatterPlot && (
					<Grid item sm={12} md={12} lg={6}>
						<ScatterPlot />
					</Grid>
				)}
				{treeMap && (
					<Grid item sm={12} md={12} lg={6}>
						<TreeMap />
					</Grid>
				)}
			</Grid>
		</>
	);
};

export default Dashboard;
