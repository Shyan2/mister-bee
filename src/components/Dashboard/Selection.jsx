import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';

const Selection = ({
	pieChart,
	groupedBarChart,
	progressCard,
	stackedBarChart,
	barPlot,
	setBarPlot,
	circularPacking,
	setCircularPacking,
	lineChart,
	setLineChart,
	scatterPlot,
	setScatterPlot,
	treeMap,
	setTreeMap,
	setPieChart,
	setGroupedBarChart,
	setProgressCard,
	setStackedBarChart,
}) => {
	const handlePieChartChange = (event) => {
		setPieChart(event.target.checked);
	};
	const handleGroupedBarChartChange = (event) => {
		setGroupedBarChart(event.target.checked);
	};
	const handleProgressCardChange = (event) => {
		setProgressCard(event.target.checked);
	};
	const handleStackedBarChartChange = (event) => {
		setStackedBarChart(event.target.checked);
	};

	const handleBarPlotChange = (event) => {
		setBarPlot(event.target.checked);
	};
	const handleCircularPackingChange = (event) => {
		setCircularPacking(event.target.checked);
	};
	const handleLineChartChange = (event) => {
		setLineChart(event.target.checked);
	};
	const handleScatterPlotChange = (event) => {
		setScatterPlot(event.target.checked);
	};
	const handleTreeMapChange = (event) => {
		setTreeMap(event.target.checked);
	};

	return (
		<>
			<FormGroup row sx={{ m: 1 }}>
				<FormControlLabel
					key={'piechart'}
					control={<Switch checked={pieChart} onChange={handlePieChartChange} />}
					label="Pie Chart"
				/>
				<FormControlLabel
					key={'groupedBarchart'}
					control={<Switch checked={groupedBarChart} onChange={handleGroupedBarChartChange} />}
					label="Grouped Barchart"
				/>
				{/* <FormControlLabel
					key={'progresscard'}
					control={<Switch checked={progressCard} onChange={handleProgressCardChange} />}
					label="計劃整體進度"
				/> */}
				<FormControlLabel
					key={'stackedbarchart'}
					control={<Switch checked={stackedBarChart} onChange={handleStackedBarChartChange} />}
					label="Stacked Chart"
				/>

				<FormControlLabel
					key={'barplot'}
					control={<Switch checked={barPlot} onChange={handleBarPlotChange} />}
					label="Bar Plot"
				/>
				{/* <FormControlLabel
					key={'circularpacking'}
					control={<Switch checked={circularPacking} onChange={handleCircularPackingChange} />}
					label="Circular Packing"
				/> */}
				<FormControlLabel
					key={'linechart'}
					control={<Switch checked={lineChart} onChange={handleLineChartChange} />}
					label="Line Chart"
				/>
				<FormControlLabel
					key={'scatterplot'}
					control={<Switch checked={scatterPlot} onChange={handleScatterPlotChange} />}
					label="Scatter Plot"
				/>
				{/* <FormControlLabel
					key={'treemap'}
					control={<Switch checked={treeMap} onChange={handleTreeMapChange} />}
					label="Tree Map"
				/> */}
			</FormGroup>
		</>
	);
};

export default Selection;
