import React, { useState, useEffect, useMemo } from 'react';
import { SelectedProjectContext, SelectedFolderContext } from './Context';
import { Box, Typography, Grid } from '@mui/material';
import TitleBar from './Navigation/TitleBar';
import Tabs from './Navigation/Tabs';

const Home = () => {
	const [selectedProject, setSelectedProject] = useState({});
	const [selectedFolder, setSelectedFolder] = useState({});

	const selectedProjectValue = useMemo(
		() => ({ selectedProject, setSelectedProject }),
		[selectedProject, setSelectedProject],
	);
	const selectedFolderValue = useMemo(
		() => ({ selectedFolder, setSelectedFolder }),
		[selectedFolder, setSelectedFolder],
	);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (Object.keys(selectedProject).length > 0 && Object.keys(selectedFolder).length > 0) {
			setIsLoading(true);
		}
	}, []);

	return (
		<SelectedProjectContext.Provider value={selectedProjectValue}>
			<SelectedFolderContext.Provider value={selectedFolderValue}>
				<Box display="flex" sx={{ border: 1, margin: 2 }} style={{ height: '80vh' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TitleBar />
							<Tabs />
						</Grid>
					</Grid>
				</Box>
			</SelectedFolderContext.Provider>
		</SelectedProjectContext.Provider>
	);
};

export default Home;
