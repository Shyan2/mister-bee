import React, { useState, useEffect, useMemo } from 'react';
import { SelectedProjectContext, SelectedFolderContext } from './Context';
import moment from 'moment';
import axios from 'axios';

import ProjectMapping from '../../ProjectMapping';
import { Box, Typography, Grid } from '@mui/material';
import TitleBar from './Navigation/TitleBar';
import Tabs from './Navigation/Tabs';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;
const DEFAULT_PROJECT = 'BIM Team Test Platform';

const Home = () => {
	const [selectedProject, setSelectedProject] = useState({});
	const [selectedFolder, setSelectedFolder] = useState({});

	const [projectList, setProjectList] = useState([]);
	const [folderList, setFolderList] = useState([]);

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const selectedProjectValue = useMemo(
		() => ({ selectedProject, setSelectedProject }),
		[selectedProject, setSelectedProject],
	);
	const selectedFolderValue = useMemo(
		() => ({ selectedFolder, setSelectedFolder }),
		[selectedFolder, setSelectedFolder],
	);

	const handleProjectChange = (event) => {
		setSelectedFolder({});

		let obj = ProjectMapping.find((o) => o.projectName === event.target.value);
		setSelectedProject(obj);
		setFolderList(obj.folders);
	};

	// get projects from master mapping file
	useEffect(() => {
		let tempList = [];
		ProjectMapping.forEach((project) => {
			tempList.push(project.projectName);
		});
		setProjectList(tempList);

		// set default project and folders
		let obj = ProjectMapping.find((o) => o.projectName === DEFAULT_PROJECT);
		setSelectedProject(obj);
		setFolderList(obj.folders);
		setSelectedFolder(obj.folders[0]);
	}, []);

	useEffect(() => {
		if (Object.keys(selectedProject).length > 0 && Object.keys(selectedFolder).length > 0) {
			setIsLoading(true);
			const fetchItem = async () => {
				const itemList = [];
				let result = '';
				try {
					if (selectedFolder.folderType === 'design') {
						result = await axios.get(`${SERVER_URL}/api/forge/getDesignItems?projectID=${selectedProject.projectID}`);
					}
					if (selectedFolder.folderType === 'BIM') {
						result = await axios.get(`${SERVER_URL}/api/forge/getBIMDocs?projectID=${selectedProject.projectID}`);
					}
					if (selectedFolder.folderType === 'construction') {
						result = await axios.get(
							`${SERVER_URL}/api/forge/getConstructionItems?projectID=${selectedProject.projectID}`,
						);
					}

					// want to batch process the data, so need to call the postBatchIndexes with all the versions from above
					console.log(result.data);

					result.data.forEach((item) => {
						// match versions and items. Optional chaining because versionResult may be undefined
						itemList.push({
							id: item._id,
							name: item.name,
							version: 'V' + item.version.substring(item.version.indexOf('=') + 1),
							versionPath: item.version,
							filePath: item.filePath.split('/').slice(-1).join('/'),
							// filePath: item.filePath,
							urn: item.urn,
							fileSize: (item.fileSize / 100000).toFixed(2) + ' MB',
							lastUpdated: moment(item.lastUpdated).format('YYYY/MM/DD - HH:mm'),
						});
					});
					setItems(itemList);
					setIsLoading(false);
				} catch (error) {
					// console.log(error);
					throw error;
				}
			};
			fetchItem();
		} else {
			setItems([]);
		}
	}, []);

	return (
		// <SelectedProjectContext.Provider value={selectedProjectValue}>
		// 	<SelectedFolderContext.Provider value={selectedFolderValue}>
		// 		<Box display="flex" sx={{ border: 1, margin: 2 }} style={{ height: '80vh' }}>
		// 			<Grid container spacing={2}>
		// 				<Grid item xs={12}>
		// 					<TitleBar selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
		// 					<Tabs />
		// 				</Grid>
		// 			</Grid>
		// 		</Box>
		// 	</SelectedFolderContext.Provider>
		// </SelectedProjectContext.Provider>
		<h1>Home</h1>
	);
};

export default Home;
