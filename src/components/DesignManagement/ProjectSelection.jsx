import React, { useState, useEffect } from 'react';
import { Box, Button, InputLabel, MenuItem, FormControl, Select, IconButton } from '@mui/material';
import ProjectMapping from '../../ProjectMapping';
import RefreshIcon from '@mui/icons-material/Refresh';

import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const ProjectSelection = ({ selectedProject, setSelectedProject, selectedFolder, setSelectedFolder }) => {
	const [projectList, setProjectList] = useState([]);
	const [folderList, setFolderList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleProjectChange = (event) => {
		setSelectedFolder({});

		let obj = ProjectMapping.find((o) => o.projectName === event.target.value);
		setSelectedProject(obj);
		setFolderList(obj.folders);
	};

	const handleFolderChange = (event) => {
		let obj = selectedProject.folders.find((o) => o.folderName === event.target.value);

		setSelectedFolder(obj);
	};

	useEffect(() => {
		let tempList = [];
		ProjectMapping.forEach((project) => {
			tempList.push(project.projectName);
		});
		setProjectList(tempList);
	}, []);

	const getFolders = () => {
		let folderMenuList = [];
		folderList.forEach((folder) => {
			folderMenuList.push(
				<MenuItem key={folder.folderID} value={folder.folderName}>
					{folder.folderName}
				</MenuItem>,
			);
		});
		return folderMenuList;
	};

	const getProjects = () => {
		let projectMenuList = [];
		projectList.forEach((project) => {
			projectMenuList.push(
				<MenuItem key={project} value={project}>
					{project}
				</MenuItem>,
			);
		});
		return projectMenuList;
	};

	const updateFiles = async () => {
		setIsLoading(true);
		switch (selectedFolder.folderType) {
			case 'design':
				const desResult = await axios.post(`${SERVER_URL}/api/forge/createDesignDocs`, {
					data: {
						projectID: selectedProject.projectID,
						folderID: selectedFolder.folderID,
					},
				});
				console.log(desResult);
				setIsLoading(false);
				break;
			case 'construction':
				const constResult = await axios.post(`${SERVER_URL}/api/forge/createConstructionDocs`, {
					data: {
						projectID: selectedProject.projectID,
						folderID: selectedFolder.folderID,
					},
				});
				console.log(constResult);
				setIsLoading(false);
				break;
			case 'BIM':
				const BIMresult = await axios.post(`${SERVER_URL}/api/forge/createBIMDocs`, {
					data: {
						projectID: selectedProject.projectID,
						folderID: selectedFolder.folderID,
					},
				});
				console.log(BIMresult);
				setIsLoading(false);
				break;
			default:
				console.log('Folder type does not exist in database.');
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
			<Box>
				<FormControl sx={{ mr: 2, minWidth: 240 }}>
					<InputLabel id="project-select-label">Select Project</InputLabel>
					<Select
						labelId="project-select-label"
						id="project-select"
						value={selectedProject.projectName || ''}
						label="Select Project"
						onChange={handleProjectChange}
					>
						{getProjects()}
					</Select>
				</FormControl>
				{selectedProject.projectName && (
					<FormControl sx={{ minWidth: 240 }}>
						<InputLabel id="folder-select-label">Select Folder</InputLabel>
						<Select
							labelId="folder-select-label"
							id="folder-select"
							value={selectedFolder.folderName || ''}
							label="Select Folder"
							onChange={handleFolderChange}
						>
							{getFolders()}
						</Select>
					</FormControl>
				)}
			</Box>

			{selectedFolder.folderName && (
				<IconButton
					size="large"
					color="secondary"
					// variant="outlined"
					// sx={{ ml: 2, mt: 1 }}
					disabled={isLoading}
					onClick={() => {
						updateFiles();
					}}
				>
					<RefreshIcon fontSize="inherit" />
				</IconButton>
			)}
		</Box>
	);
};

export default ProjectSelection;
