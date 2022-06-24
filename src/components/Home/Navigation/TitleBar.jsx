import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const TitleBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#f53528' }}>
				<Toolbar style={{ minHeight: '48px' }}>
					<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
						{'PMIS BIM Management --> 2800084A'}
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default TitleBar;
