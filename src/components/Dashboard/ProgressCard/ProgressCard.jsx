import React from 'react';
import { useData } from './useData';

import Gauge from './Gauge';
import { ProgressTable } from './ProgressTable';

import { Box, Typography } from '@mui/material';

const ProgressCard = () => {
	const data = useData();

	return (
		<Box sx={{ m: 3 }}>
			<Typography sx={{ mt: 2, mb: 1 }} variant="h1" align="center">
				計劃整體進度
			</Typography>
			<Gauge data={data} />
			<div>&nbsp;&nbsp;&nbsp;</div>
			&nbsp;
			<ProgressTable data={data} />
		</Box>
	);
};

export default ProgressCard;
