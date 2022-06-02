import React from 'react';
import { styled } from '@mui/material/styles';

import { Box, List, Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FolderIcon from '@mui/icons-material/Folder';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FeedIcon from '@mui/icons-material/Feed';

import { Link } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(6)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const MenuDrawer = ({ open }) => {
	return (
		<Drawer variant="permanent" open={open}>
			<Box sx={{ minHeight: 48 }}></Box>
			<Box mb={2}>
				<List>
					<ListItem button key={'Home'} component={Link} to="/">
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText>Home</ListItemText>
					</ListItem>

					<ListItem button key={'Dashboard'} component={Link} to="/dashboard">
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText>Dashboard</ListItemText>
					</ListItem>

					<ListItem button key={'Design Management'} component={Link} to="/designManagement">
						<ListItemIcon>
							<DesignServicesIcon />
						</ListItemIcon>
						<ListItemText>Design Management</ListItemText>
					</ListItem>

					<ListItem button key={'ModelProperties'} component={Link} to="/modelproperties">
						<ListItemIcon>
							<FormatListBulletedIcon />
						</ListItemIcon>
						<ListItemText>Model Properties</ListItemText>
					</ListItem>

					<ListItem button key={'SendReceieveDocs'} component={Link} to="/sendReceiveDocs">
						<ListItemIcon>
							<FeedIcon />
						</ListItemIcon>
						<ListItemText>收發文 Insights</ListItemText>
					</ListItem>

					<ListItem button key={'Issues'} component={Link} to="/issues">
						<ListItemIcon>
							<DesignServicesIcon />
						</ListItemIcon>
						<ListItemText>Issues</ListItemText>
					</ListItem>
				</List>
			</Box>
			<Divider />
			<Box>
				<ListItem button key={'BIM360Tree'} component={Link} to="/bim360tree">
					<ListItemIcon>
						<FolderIcon />
					</ListItemIcon>
					<ListItemText>BIM360 Tree</ListItemText>
				</ListItem>
				<List>
					<ListItem button key={'KnowledgeBase'} component={Link} to="/knowledgeBase">
						<ListItemIcon>
							<LibraryBooksIcon />
						</ListItemIcon>
						<ListItemText>Knowledge Base</ListItemText>
					</ListItem>
				</List>
			</Box>

			<Divider />

			<Box>
				<List>
					<ListItem button key={'Admin'} disabled>
						<ListItemIcon>
							<SupervisorAccountIcon />
						</ListItemIcon>
						<ListItemText>Admin</ListItemText>
					</ListItem>
					<ListItem button key={'Settings'} disabled>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText>Account</ListItemText>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
};

export default MenuDrawer;
