import { useState, useEffect, useContext } from 'react';
import { Typography, Box, Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const AutodeskUser = () => {
	const [user, setUser] = useState(null);
	const [loginLink, setLoginLink] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
		<>
			{/* <Typography>Autodesk Account Login</Typography> */}
			{user?.firstName ? (
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<img alt="user-pic" height="30" width="30" src={user.picture} />
					&nbsp;
					<Typography>{user.firstName + ' ' + user.lastName}</Typography>
					<IconButton
						color="secondary"
						size="small"
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
		</>
	);
};

export default AutodeskUser;
