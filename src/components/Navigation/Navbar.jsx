import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { AppBar, Box, Typography, Toolbar, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import MenuDrawer from './MenuDrawer';

import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const Navbar = () => {
	const classes = useStyles();

	const { user, setUser } = useContext(UserContext);

	const [open, setOpen] = useState(false);
	const [loginLink, setLoginLink] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const switchDrawer = () => {
		setOpen((prevOpen) => !prevOpen);
	};
	useEffect(() => {
		const getUserProfile = async () => {
			try {
				const result = await axios.get(`${SERVER_URL}/api/forge/user/profile`, {
					withCredentials: true,
				});
				// console.log(result.data);
				setUser(result.data);
				return result.data;
			} catch (err) {
				console.log(err);
			}
		};

		const checkForUserProfile = async () => {
			const result = await getUserProfile();
			if (result?.statusCode === 401) {
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}
		};
		checkForUserProfile();
	}, []);

	useEffect(() => {
		const fetchLoginLink = async () => {
			try {
				const result = await axios.get(`${SERVER_URL}/api/forge/oauth/url`);
				setLoginLink(result.data);
			} catch (err) {
				console.log(err);
				throw err;
			}
		};
		fetchLoginLink();
	}, []);

	const logOutAutodesk = async () => {
		setUser({});
		try {
			await axios.get(`${SERVER_URL}/api/forge/oauth/logout`, {
				withCredentials: true,
			});
		} catch (err) {
			console.log(err);
		}
		const newWindow = window.open('https://accounts.autodesk.com/Authentication/LogOut');

		setTimeout(() => {
			if (newWindow) {
				newWindow.close();
			}
		}, 500);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				className={classes.appBar}
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#f53528' }}
			>
				{/* why does minHeight in classes not work on toolbar?? */}
				<Toolbar className={classes.toolbar} style={{ minHeight: 48 }}>
					{/* <IconButton color="inherit" aria-label="open drawer" onClick={switchDrawer} edge="start">
						<MenuIcon />
					</IconButton> */}
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={switchDrawer} sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					{/* <Typography component={Link} to="/" className={classes.heading} variant="h5"> */}
					<Box sx={{ flexGrow: 1 }}>
						<Typography
							variant="h5"
							component={Link}
							to="/"
							sx={{ color: '#f2f2f2', textDecoration: 'none' }}
							// sx={{ flexGrow: 1, color: '#f2f2f2', textDecoration: 'none' }}
						>
							VDC Development Platform
						</Typography>
					</Box>

					{user.firstName ? (
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<img alt="user-pic" height="30" width="30" src={user.picture} />
							&nbsp; &nbsp;
							<Typography>{user.firstName + ' ' + user.lastName}</Typography>
							&nbsp;
							<IconButton
								color="inherit"
								onClick={() => {
									// console.log('Lougout Clicked!');
									logOutAutodesk();
								}}
							>
								<LogoutIcon />
							</IconButton>
						</Box>
					) : (
						<IconButton color="inherit" href={loginLink}>
							<LoginIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
			<MenuDrawer open={open} />
		</Box>
	);
};

export default Navbar;
