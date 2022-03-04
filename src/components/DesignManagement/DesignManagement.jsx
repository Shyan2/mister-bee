import { useState, useEffect, useMemo } from 'react';
import { SelectedObjectContext } from './Context';
import { Box, CircularProgress } from '@mui/material';

import DesignTable from './DesignTable';
import Viewer from './Viewer';
import Compare2d from './Compare2d';
import ProjectSelection from './ProjectSelection';

import moment from 'moment';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

function DesignManagement() {
	const [isLoading, setIsLoading] = useState(false);
	const [items, setItems] = useState([]);
	const [selectedObject, setSelectedObject] = useState({});

	const [selectedProject, setSelectedProject] = useState({});
	const [selectedFolder, setSelectedFolder] = useState({});

	const selectedObjectValue = useMemo(
		() => ({ selectedObject, setSelectedObject }),
		[selectedObject, setSelectedObject],
	);

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
					result.data.forEach((item) => {
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
					console.log(error);
					throw error;
				}
			};
			fetchItem();
		} else {
			setItems([]);
		}
	}, [selectedProject, selectedFolder]);

	return (
		<Box sx={{ m: 2 }}>
			<ProjectSelection {...{ selectedProject, setSelectedProject, selectedFolder, setSelectedFolder }} />
			<SelectedObjectContext.Provider value={selectedObjectValue}>
				{selectedObject.compareView && <Compare2d projectID={selectedProject.projectID} />}
				{selectedObject.simpleView && <Viewer />}
				<Box
					style={{
						height: '85vh',
						display: !selectedObject.id ? 'flex' : 'none',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{!items ? <CircularProgress /> : <DesignTable items={items} isLoading={isLoading} />}
				</Box>
			</SelectedObjectContext.Provider>
		</Box>
	);
}

export default DesignManagement;
