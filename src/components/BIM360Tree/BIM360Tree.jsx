import * as React from 'react';
import PropTypes from 'prop-types';
import { SelectedItemContext } from './Context';
import { CircularProgress } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ClearIcon from '@mui/icons-material/Clear';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import { styled, alpha } from '@mui/material/styles';

import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const CustomContentRoot = styled('div')(({ theme }) => ({
	WebkitTapHighlightColor: 'transparent',

	'&.MuiTreeItem-content.Mui-selected': {
		backgroundColor: 'transparent',
	},
	[`&.MuiTreeItem-contentBar`]: {
		position: 'absolute',
		width: '100%',
		height: 24,
		left: 0,
		'&:hover &': {
			backgroundColor: theme.palette.action.hover,

			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {},
		},
		'&.Mui-disabled &': {
			opacity: theme.palette.action.disabledOpacity,
		},
		'&.Mui-focused &': {
			backgroundColor: theme.palette.action.focus,
		},
		'&.Mui-selected &': {
			backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
		},
		'&.Mui-selected:hover &': {
			backgroundColor: alpha(
				theme.palette.primary.main,
				theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
			),

			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
			},
		},
		'&.Mui-selected.Mui-focused &': {
			backgroundColor: alpha(
				theme.palette.primary.main,
				theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
			),
		},
	},
}));

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
	const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props;
	const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } =
		useTreeItem(nodeId);
	const icon = iconProp || expansionIcon || displayIcon;

	const handleMouseDown = (event) => {
		preventSelection(event);
	};

	const handleExpansionClick = (event) => {
		handleExpansion(event);
	};

	const handleSelectionClick = (event) => {
		props.onClick();
		handleSelection(event);
	};

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<CustomContentRoot
			className={clsx(className, classes.root, {
				'Mui-expanded': expanded,
				'Mui-selected': selected,
				'Mui-focused': focused,
				'Mui-disabled': disabled,
			})}
			onMouseDown={handleMouseDown}
			ref={ref}
		>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
			<div onClick={handleExpansionClick} className={classes.iconContainer} disabled>
				{icon}
			</div>
			<Typography onClick={handleSelectionClick} component="div" className={classes.label} disabled>
				{label}
			</Typography>
		</CustomContentRoot>
	);
});

const BIM360Tree = (props) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [childNodes, setChildNodes] = React.useState(null);
	const [expanded, setExpanded] = React.useState([]);

	const { SelectedItem, setSelectedItem } = React.useContext(SelectedItemContext);

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
		// console.log(result.data);
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
		// console.log(nodes);
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
								return <BIM360Tree key={node.id} {...node} icon={<RemoveCircleIcon />} disabled />;
							case 'none':
								return <BIM360Tree key={node.id} {...node} icon={<ClearIcon />} disabled />;
							default:
								return <BIM360Tree key={node.id} {...node} name="empty" />;
						}
					}),
				);
			});
		}
	};

	CustomContent.propTypes = {
		/**
		 * Override or extend the styles applied to the component.
		 */
		classes: PropTypes.object.isRequired,
		/**
		 * className applied to the root element.
		 */
		className: PropTypes.string,
		/**
		 * The icon to display next to the tree node's label. Either a parent or end icon.
		 */
		displayIcon: PropTypes.node,
		/**
		 * The icon to display next to the tree node's label. Either an expansion or collapse icon.
		 */
		expansionIcon: PropTypes.node,
		/**
		 * The icon to display next to the tree node's label.
		 */
		icon: PropTypes.node,
		/**
		 * The tree node label.
		 */
		label: PropTypes.node,
		/**
		 * The id of the node.
		 */
		nodeId: PropTypes.string.isRequired,
	};

	// const renderLabel = (item) => {
	// 	return (
	// 		<span
	// 			onClick={() => {
	// 				// setSelectedItem(item);
	// 				console.log('clicked!');
	// 			}}
	// 		>
	// 			{item.name}
	// 		</span>
	// 	);
	// };

	// const CustomTreeItem = (props) => {
	// 	// console.log(props);
	// 	const nodeInfo = {
	// 		id: props.id,
	// 		name: props.name,
	// 		type: props.type,
	// 	};
	// 	return (
	// 		<TreeItem
	// 			ContentComponent={CustomContent}
	// 			{...props}
	// 			onClick={() => {
	// 				setSelectedItem(nodeInfo);
	// 				console.log('switched selected Item!');
	// 			}}
	// 		/>
	// 	);
	// };

	return (
		<TreeView
			aria-label="icon expansion"
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			expanded={expanded}
			onNodeToggle={handleChange}
			// sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
		>
			<TreeItem
				ContentComponent={CustomContent}
				nodeId={props.id}
				label={props.name}
				// label={renderLabel(props)}
				icon={props.icon}
				{...props}
				collapseIcon={props.collapseIcon}
				expandIcon={props.expandIcon}
				// {...props}
				onClick={() => {
					setSelectedItem(props);
				}}
			>
				{!isLoading ? childNodes || [<div key="stub" />] : <CircularProgress />}
			</TreeItem>
		</TreeView>
	);
};

export default BIM360Tree;
