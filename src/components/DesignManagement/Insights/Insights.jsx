import React, { useContext, useRef } from 'react';
import { ModelPropertiesContext } from '../Context';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModelProperties from './ModelProperties';

const Insights = ({ projectId }) => {
	const { selectedModelProps, setSelectedModelProps } = useContext(ModelPropertiesContext);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" elevation={0}>
					<Toolbar variant="dense">
						<IconButton
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={() => {
								setSelectedModelProps({});
							}}
						>
							<ArrowBackIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" component="div">
							{selectedModelProps.versionName}
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<ModelProperties
				projectId={projectId}
				indexId={selectedModelProps.indexId}
				queryId={selectedModelProps.queryId}
			/>
		</>
	);
};

export default Insights;
