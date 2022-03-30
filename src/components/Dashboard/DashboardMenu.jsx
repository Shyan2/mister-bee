import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import SettingsIcon from '@mui/icons-material/Settings';

export default function DashboardMenu({
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
}) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handlePieChartChange = (event) => {
		localStorage.setItem('pie', event.target.checked);
		setPieChart(event.target.checked);
	};
	const handleGroupedBarChartChange = (event) => {
		localStorage.setItem('groupbar', event.target.checked);
		setGroupedBarChart(event.target.checked);
	};
	const handleProgressCardChange = (event) => {
		setProgressCard(event.target.checked);
	};
	const handleStackedBarChartChange = (event) => {
		localStorage.setItem('stackedbar', event.target.checked);
		setStackedBarChart(event.target.checked);
	};

	const handleBarPlotChange = (event) => {
		localStorage.setItem('bar', event.target.checked);
		setBarPlot(event.target.checked);
	};
	const handleCircularPackingChange = (event) => {
		setCircularPacking(event.target.checked);
	};
	const handleLineChartChange = (event) => {
		localStorage.setItem('line', event.target.checked);
		setLineChart(event.target.checked);
	};
	const handleScatterPlotChange = (event) => {
		localStorage.setItem('scatter', event.target.checked);
		setScatterPlot(event.target.checked);
	};
	const handleTreeMapChange = (event) => {
		setTreeMap(event.target.checked);
	};

	return (
		<div>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<SettingsIcon />
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem style={{ backgroundColor: 'transparent' }}>
					<FormControlLabel
						key={'piechart'}
						control={<Switch checked={pieChart} onChange={handlePieChartChange} />}
						label="Pie Chart"
					/>
				</MenuItem>
				<MenuItem style={{ backgroundColor: 'transparent' }}>
					<FormControlLabel
						key={'groupedBarchart'}
						control={<Switch checked={groupedBarChart} onChange={handleGroupedBarChartChange} />}
						label="Grouped Barchart"
					/>
				</MenuItem>

				<MenuItem style={{ backgroundColor: 'transparent' }}>
					<FormControlLabel
						key={'stackedbarchart'}
						control={<Switch checked={stackedBarChart} onChange={handleStackedBarChartChange} />}
						label="Stacked Chart"
					/>
				</MenuItem>
				<MenuItem style={{ backgroundColor: 'transparent' }}>
					<FormControlLabel
						key={'barplot'}
						control={<Switch checked={barPlot} onChange={handleBarPlotChange} />}
						label="Bar Plot"
					/>
				</MenuItem>
				<MenuItem style={{ backgroundColor: 'transparent' }}>
					<FormControlLabel
						key={'linechart'}
						control={<Switch checked={lineChart} onChange={handleLineChartChange} />}
						label="Line Chart"
					/>
				</MenuItem>
				<MenuItem style={{ backgroundColor: 'transparent' }}>
					<FormControlLabel
						key={'scatterplot'}
						control={<Switch checked={scatterPlot} onChange={handleScatterPlotChange} />}
						label="Scatter Plot"
					/>
				</MenuItem>
			</Menu>
		</div>
	);
}
