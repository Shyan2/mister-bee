import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';

const Selection = ({
	pieChart,
	barChart,
	progressCard,
	stackedBarChart,
	sendReceieveDocs,
	setPieChart,
	setBarChart,
	setProgressCard,
	setStackedBarChart,
	setSendReceiveDocs,
}) => {
	const handlePieChartChange = (event) => {
		setPieChart(event.target.checked);
	};
	const handleBarChartChange = (event) => {
		setBarChart(event.target.checked);
	};
	const handleProgressCardChange = (event) => {
		setProgressCard(event.target.checked);
	};
	const handleStackedBarChartChange = (event) => {
		setStackedBarChart(event.target.checked);
	};
	const handleSendReceieveDocsChange = (event) => {
		setSendReceiveDocs(event.target.checked);
	};

	return (
		<>
			<FormGroup row sx={{ m: 1 }}>
				<FormControlLabel
					key={'piechart'}
					control={<Switch checked={pieChart} onChange={handlePieChartChange} />}
					label="第二次建設計劃"
				/>
				<FormControlLabel
					key={'barchart'}
					control={<Switch checked={barChart} onChange={handleBarChartChange} />}
					label="TP6A_鋼構進場數量"
				/>
				<FormControlLabel
					key={'progresscard'}
					control={<Switch checked={progressCard} onChange={handleProgressCardChange} />}
					label="計劃整體進度"
				/>
				<FormControlLabel
					key={'stackedbarchart'}
					control={<Switch checked={stackedBarChart} onChange={handleStackedBarChartChange} />}
					label="Stacked Chart"
				/>
				<FormControlLabel
					key={'sendReceieveDocs'}
					control={<Switch checked={sendReceieveDocs} onChange={handleSendReceieveDocsChange} />}
					label="收發文"
				/>
			</FormGroup>
		</>
	);
};

export default Selection;
