import { useState, useEffect, useContext } from 'react';
import { SelectedItemContext } from './Context';
import { ViewingItemContext } from './Context';
import { CircularProgress, Typography } from '@mui/material';
import FileVersions from './FileVersions';
import ProjectInfo from './ProjectInfo';

import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const FileInfoTable = () => {
	const { selectedItem } = useContext(SelectedItemContext);

	const [permissionsLoading, setPermissionsLoading] = useState(false);
	const [resourceID, setResourceID] = useState('');
	const [projectID, setProjectID] = useState('');
	const [resourceType, setResourceType] = useState('');
	const [folderPermissions, setFolderPermissions] = useState({});
	const [projectUsers, setProjectUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [versionList, setVersionList] = useState([]);

	useEffect(() => {
		if (selectedItem.type === 'bim360Hubs') {
			setResourceType(selectedItem.type);
			const params = selectedItem?.id.split('/');
			setProjectID('');
			setResourceID(params[params.length - 1]);
		}

		if (selectedItem.type === 'items') {
			// console.log('item!');
			// send the item to listProjects API route to retrieve the versions.
			// need to send the selectedItem.id
			setResourceType(selectedItem.type);
			const params = selectedItem?.id.split('/');
			setResourceID(params[params.length - 1]);
			setProjectID(params[params.length - 3]);
		}

		if (selectedItem.type === 'bim360projects') {
			setResourceType(selectedItem.type);
			const params = selectedItem?.id.split('/');
			setProjectID(params[params.length - 1]);
			setResourceID(params[params.length - 1]);
		}

		if (selectedItem.type === 'folders') {
			setResourceType(selectedItem.type);
			const params = selectedItem?.id.split('/');

			setResourceID(params[params.length - 1]);
			setProjectID(params[params.length - 3].replace('b.', ''));
		}

		if (selectedItem.type === 'none') {
			setResourceType('');
			setResourceID('');
			setProjectID('');
		}
	}, [selectedItem]);

	useEffect(() => {
		setPermissionsLoading(true);
		setFolderPermissions({});
		if (resourceType === 'folders' && resourceID) {
			getFolderPermission();
		}

		if (resourceType === 'items' && resourceID) {
			fetchVersions(selectedItem.id);
		}

		if (resourceType === 'bim360projects' && resourceID) {
			fetchProjectUsers(selectedItem.id);
		}
	}, [resourceType, resourceID]);

	const getFolderPermission = async () => {
		const result = await axios.get(
			`${SERVER_URL}/api/forge/folders/getPermissions?projectID=${projectID}&folderID=${resourceID}`,
		);
		setFolderPermissions(result.data);
		setPermissionsLoading(false);
		return result.data;
	};

	const fetchVersions = async (nodeId) => {
		setVersionList([]);
		setIsLoading(true);
		const result = await axios.get(`${SERVER_URL}/api/forge/listProjects`, {
			withCredentials: true,
			params: {
				id: nodeId,
			},
		});
		// console.log(result.data);
		setVersionList(result.data);
		setIsLoading(false);
		// return result.data;
	};

	const fetchProjectUsers = async (nodeId) => {
		setIsLoading(true);
		setProjectUsers([]);

		const result = await axios.get(`${SERVER_URL}/api/forge/projects/getUsersInProject?projectID=${projectID}`);

		setProjectUsers(result.data);
		setIsLoading(false);
	};

	return (
		<>
			<div>
				{resourceType ? (
					<>
						{/* <div>{'Type:' + selectedItem.type}</div>
						<div>Project ID: {projectID}</div>
						<div>ID: {resourceID} </div> */}
						<Typography variant="h3">{selectedItem.name}</Typography>
						&nbsp;
						{/* {Object.keys(folderPermissions).length > 0 && ( */}
						{selectedItem.type === 'folders' && (
							<>
								<div>權限</div>
								{permissionsLoading ? (
									<CircularProgress />
								) : (
									folderPermissions?.map((folderPermission) => (
										<div key={folderPermission.autodeskId}>
											{folderPermission.name} - {folderPermission.subjectType}
										</div>
									))
								)}
							</>
						)}
						{selectedItem.type === 'items' && <FileVersions versionList={versionList} isLoading={isLoading} />}
						{selectedItem.type === 'bim360projects' && (
							<ProjectInfo projectUsers={projectUsers} isLoading={isLoading} />
						)}
					</>
				) : (
					<div></div>
				)}
			</div>
		</>
	);
};

export default FileInfoTable;
