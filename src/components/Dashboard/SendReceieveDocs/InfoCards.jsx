import React, { useEffect, useContext } from 'react';
import { DateRangeContext } from './Context';
import { Typography } from '@mui/material';
import { timeFormat } from 'd3';

const dateFormattingFunction = timeFormat('%m/%d/%Y');

const InfoCards = ({ data, brushExtent }) => {
	const { selectedDateRange } = useContext(DateRangeContext);

	return (
		<>
			{brushExtent ? (
				<>
					<Typography variant="h5">Start: {dateFormattingFunction(brushExtent[0])}</Typography>
					<Typography variant="h5">End: {dateFormattingFunction(brushExtent[1])}</Typography>
					<Typography variant="h5">Count:{data.length}</Typography>
				</>
			) : (
				<>
					<Typography variant="h5">Start: {selectedDateRange[0]} </Typography>
					<Typography variant="h5">End: {selectedDateRange[1]}</Typography>
					<Typography variant="h5">Count: {data.length}</Typography>
				</>
			)}
		</>
	);
};

export default InfoCards;
