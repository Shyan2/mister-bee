import React, { useState, useEffect, useContext } from 'react';
import { SelectedObjectContext, ModelPropertiesContext } from './Context';
import AutodeskUser from './AutodeskUser/AutodeskUser';
import { Box, Button, InputLabel, MenuItem, FormControl, Select, IconButton } from '@mui/material';
import ProjectMapping from '../../ProjectMapping';
import RefreshIcon from '@mui/icons-material/Refresh';

import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

// const DEFAULT_PROJECT = '2800450A';
const DEFAULT_PROJECT = process.env.REACT_APP_DEFAULT_PROJECT;

const ProjectSelection = ({ selectedProject, setSelectedProject, selectedFolder, setSelectedFolder }) => {
	const { selectedObject, setSelectedObject } = useContext(SelectedObjectContext);
	const { selectedModelProps, setSelectedModelProps } = useContext(ModelPropertiesContext);

	const [projectList, setProjectList] = useState([]);
	const [folderList, setFolderList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	useEffect(() => {
		if (selectedObject.id || selectedModelProps.indexId) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
		// console.log(isDisabled);
	}, [selectedObject, selectedModelProps]);

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
				// console.log(desResult);
				setIsLoading(false);
				break;
			case 'construction':
				const constResult = await axios.post(`${SERVER_URL}/api/forge/createConstructionDocs`, {
					data: {
						projectID: selectedProject.projectID,
						folderID: selectedFolder.folderID,
					},
				});
				// console.log(constResult);
				setIsLoading(false);
				break;
			case 'BIM':
				const BIMresult = await axios.post(`${SERVER_URL}/api/forge/createBIMDocs`, {
					data: {
						projectID: selectedProject.projectID,
						folderID: selectedFolder.folderID,
					},
				});
				// console.log(BIMresult);
				setIsLoading(false);
				break;
			default:
				console.log('Folder type does not exist in database.');
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
			<Box>
				<FormControl size="small" sx={{ mr: 2, minWidth: 240 }} disabled={isDisabled}>
					<InputLabel id="project-select-label">專案 / Project</InputLabel>
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
					<FormControl size="small" sx={{ minWidth: 240 }} disabled={isDisabled}>
						<InputLabel id="folder-select-label">資料夾 / Folder</InputLabel>
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
			<Box style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
				<AutodeskUser />
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
		</Box>
	);
};

export default ProjectSelection;
