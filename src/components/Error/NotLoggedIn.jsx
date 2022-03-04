import { Box, Typography } from '@mui/material';
import SadBuilding from '../Assets/Sad-schoolbuilding_FeaturedImage-01-300x201.png';

const Error = () => (
	<Box display="flex" style={{ height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
		<img src={SadBuilding} />
		<Typography variant="h1">Please Login :(</Typography>
	</Box>
);

export default Error;
