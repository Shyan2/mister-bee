import { useState, useContext } from 'react';
import { UserContext } from '../../Context';
import { SelectedItemContext } from './Context';
import { CircularProgress } from '@mui/material';

import { TreeView, TreeItem } from '@mui/lab';

import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';

import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const BIM360Tree = (props) => {
	const { user } = useContext(UserContext);
	const { SelectedItem, setSelectedItem } = useContext(SelectedItemContext);

	const [isLoading, setIsLoading] = useState(false);
	const [childNodes, setChildNodes] = useState(null);
	const [expanded, setExpanded] = useState([]);

	const fetchChildNodes = async (nodeId) => {
		if (nodeId.substring(0, 8) === 'https://') {
			setIsLoading(true);
		}
		const result = await axios.get(`${SERVER_URL}/api/forge/listProjects`, {
			withCredentials: true,
			params: {
				id: nodeId,
			},
		});
		let tempTree = '';
		console.log(result.data);
		if (result.data.length > 0) {
			tempTree = result.data;
		} else {
			tempTree = [
				{
					id: 'empty',
					name: 'No Files',
					type: 'none',
					children: false,
				},
			];
		}
		setIsLoading(false);
		return tempTree;
	};

	const handleChange = (event, nodes) => {
		const expandingNodes = nodes.filter((x) => !expanded.includes(x));
		setExpanded(nodes);
		// console.log(nodes);
		if (expandingNodes[0]) {
			const childId = expandingNodes[0];
			fetchChildNodes(childId).then((result) => {
				setChildNodes(
					result.map((node) => {
						// use cases for icons here
						switch (node.type) {
							case 'bim360Hubs':
								return (
									<BIM360Tree
										key={node.id}
										{...node}
										collapseIcon={<ExpandMoreIcon />}
										expandIcon={<ChevronRightIcon />}
									/>
								);
							case 'bim360projects':
								return (
									<BIM360Tree
										key={node.id}
										{...node}
										collapseIcon={<ExpandMoreIcon />}
										expandIcon={<ChevronRightIcon />}
									/>
								);
							case 'items':
								return <BIM360Tree key={node.id} {...node} icon={<InsertDriveFileIcon />} />;
							case 'versions':
								return (
									<BIM360Tree
										key={node.id}
										{...node}
										icon={<WatchLaterIcon />}
										// set the urn
									/>
								);
							case 'folders':
								return (
									<BIM360Tree
										key={node.id}
										{...node}
										// icon={<FolderIcon />}
										collapseIcon={<FolderOpenIcon />}
										expandIcon={<FolderIcon />}
									/>
								);
							case 'unsupported':
								return <BIM360Tree key={node.id} {...node} icon={<RemoveCircleIcon />} disableSelection={true} />;
							case 'none':
								return <BIM360Tree key={node.id} {...node} disable={true} icon={<ClearIcon />} />;
							default:
								return <BIM360Tree key={node.id} {...node} name="empty" />;
						}
					}),
				);
			});
		}
	};

	const renderLabel = (item) => {
		return (
			<span
				onClick={() => {
					setSelectedItem(item);
					console.log('clicked!');
				}}
			>
				{item.name}
			</span>
		);
	};

	const renderIcon = (item) => {
		<span onClick={() => 'Clicked icon!'}>{item.icon}</span>;
	};

	return (
		<TreeView
			defaultCollapseIcon={<FolderOpenIcon />}
			defaultExpandIcon={<FolderIcon />}
			expanded={expanded}
			onNodeToggle={handleChange}
		>
			<TreeItem
				nodeId={props.id}
				// label={props.name}
				label={renderLabel(props)}
				// icon={props.icon}
				icon={renderIcon(props)}
				collapseIcon={props.collapseIcon}
				expandIcon={props.expandIcon}
				// onLabelClick={props.handleOnClick}
			>
				{!isLoading ? childNodes || [<div key="stub" />] : <CircularProgress />}
			</TreeItem>
		</TreeView>
	);
};

export default BIM360Tree;
