import React, { useState, useEffect, useContext } from 'react';
import { DateRangeContext } from './Context';
import { Grid, Typography, IconButton } from '@mui/material';
import { timeFormat } from 'd3';

import DateRangeIcon from '@mui/icons-material/DateRange';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const dateFormattingFunction = timeFormat('%m/%d/%Y');

const InfoCards = ({ data, brushExtent }) => {
	const { selectedDateRange } = useContext(DateRangeContext);

	const [dataCount, setDataCount] = useState({});

	useEffect(() => {
		const receiveCount = data.filter((obj) => obj.docType === '收文').length;
		const allDataCount = data.length;
		setDataCount({
			length: allDataCount,
			receiveCount: receiveCount,
			sentCount: allDataCount - receiveCount,
		});
	}, [data]);

	const card = () => {
		return (
			<Box style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
				{/* <Box sx={{ mr: 3 }}>
					<Typography variant="h4" fontWeight="bold" color="#1e252b">
						收文: {dataCount.receiveCount}
					</Typography>
					<Typography variant="h4" fontWeight="bold" color="#f9423a">
						發文: {dataCount.sentCount}
					</Typography>
				</Box> */}

				<IconButton disabled>
					<AddCircleIcon />
				</IconButton>
				<Typography variant="h4" color="text.secondary">
					Total: {dataCount.length}
				</Typography>
			</Box>
		);
	};

	const dateCard = (startDate, endDate) => {
		return (
			<Box style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
				<IconButton disabled>
					<DateRangeIcon />
				</IconButton>
				<Typography variant="h4" color="text.secondary">
					{startDate} ~ {endDate}
				</Typography>
			</Box>
		);
	};

	return (
		<>
			<Grid container>
				<Grid item xs={8}>
					{brushExtent ? (
						<>
							{dateCard(dateFormattingFunction(brushExtent[0]), dateFormattingFunction(brushExtent[1]))}
							{/* <Typography variant="h5">Start: {dateFormattingFunction(brushExtent[0])}</Typography>
							<Typography variant="h5">End: {dateFormattingFunction(brushExtent[1])}</Typography>
							<Typography variant="h5">Count:{data.length}</Typography> */}
						</>
					) : (
						<>
							{dateCard(selectedDateRange[0], selectedDateRange[1])}
							{/* <Typography variant="h5">Start: {selectedDateRange[0]} </Typography>
							<Typography variant="h5">End: {selectedDateRange[1]}</Typography> */}
						</>
					)}
				</Grid>
				<Grid item xs={4}>
					{/* <Card variant="outlined">{card(data.length)}</Card> */}
					{card()}
				</Grid>
			</Grid>
		</>
	);
};

export default InfoCards;
