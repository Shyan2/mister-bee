import { useState, useEffect, useMemo } from 'react';
import { SelectedObjectContext, ModelPropertiesContext } from './Context';
import { Box, CircularProgress } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import DesignTable from './DesignTable';
import Viewer from './Viewer';
import ListMarkups from './DesignMarkups/ListMarkups';
import Compare2d from './Compare2d';
import ProjectSelection from './ProjectSelection';
import Insights from './Insights/Insights';
import DesignMarkups from './DesignMarkups/DesignMarkups';

import moment from 'moment';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

function DesignManagement() {
	const [value, setValue] = useState('one');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const [isLoading, setIsLoading] = useState(false);
	const [items, setItems] = useState([]);

	const [selectedProject, setSelectedProject] = useState({});
	const [selectedFolder, setSelectedFolder] = useState({});

	// for context
	const [selectedObject, setSelectedObject] = useState({});
	const [selectedModelProps, setSelectedModelProps] = useState({});

	const selectedObjectValue = useMemo(
		() => ({ selectedObject, setSelectedObject }),
		[selectedObject, setSelectedObject],
	);

	const selectedModelPropsValue = useMemo(
		() => ({ selectedModelProps, setSelectedModelProps }),
		[selectedModelProps, setSelectedModelProps],
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

					// want to batch process the data, so need to call the postBatchIndexes with all the versions from above
					console.log(result.data);
					let versions = [];
					result.data.map((item) => {
						// need to filter. Only allow .rvt
						if (item.name.substring(item.name.length - 4) === '.rvt') {
							// console.log(item.name);
							versions.push({
								versionUrn: item.version,
							});
						}
					});
					// console.log(versions);
					const versionResult = await axios.post(
						`${SERVER_URL}/api/forge/modelproperties/postBatchIndexes?projectID=${selectedProject.projectID}`,
						{
							data: {
								versions,
							},
						},
						{
							withCredentials: true,
						},
					);

					// console.log(versionResult.data.indexes);

					result.data.forEach((item) => {
						// match versions and items. Optional chaining because versionResult may be undefined
						let properties = versionResult?.data?.indexes?.find((o) => o.versionUrns[0] === item.version);
						itemList.push({
							indexState: properties?.state,
							indexId: properties?.indexId,
							queryId: properties?.queryId, // This value may need to be implemented differently!!!
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
	}, [selectedProject, selectedFolder]);
	return (
		<Box sx={{ m: 2 }}>
			<SelectedObjectContext.Provider value={selectedObjectValue}>
				<ModelPropertiesContext.Provider value={selectedModelPropsValue}>
					<ProjectSelection {...{ selectedProject, setSelectedProject, selectedFolder, setSelectedFolder }} />
					<TabContext value={value}>
						<Tabs
							value={value}
							onChange={handleChange}
							textColor="secondary"
							indicatorColor="secondary"
							aria-label="secondary tabs example"
						>
							<Tab value="one" label="Models" />
							<Tab value="two" label="Markups" />
						</Tabs>
						<TabPanel value="one">
							<Box
								sx={{ m: 0 }}
								style={{
									height: '75vh',
									display: !selectedObject.id && !selectedModelProps.indexId ? 'flex' : 'none',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{!items ? <CircularProgress /> : <DesignTable items={items} isLoading={isLoading} />}
							</Box>
						</TabPanel>
						<TabPanel value="two">
							<Box
								sx={{ m: 0 }}
								style={{
									height: '75vh',
									display: !selectedObject.id && !selectedModelProps.indexId ? 'flex' : 'none',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<DesignMarkups />
							</Box>
						</TabPanel>
					</TabContext>

					{selectedObject.compareView && <Compare2d projectID={selectedProject.projectID} />}
					{selectedObject.simpleView && <Viewer />}
					{selectedObject.markupView && <ListMarkups selectedObject={selectedObject} />}
					{selectedModelProps.indexId && <Insights projectId={selectedProject.projectID} />}
				</ModelPropertiesContext.Provider>
			</SelectedObjectContext.Provider>
		</Box>
	);
}

export default DesignManagement;
