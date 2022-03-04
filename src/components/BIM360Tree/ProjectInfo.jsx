import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const ProjectInfo = ({ projectUsers, isLoading }) => {
	return (
		<>
			<Typography variant="h5">Project Users</Typography>
			{!isLoading ? (
				projectUsers.map((user) => (
					<div key={user.autodeskID}>
						{user.name} - {user.email}
					</div>
				))
			) : (
				<CircularProgress />
			)}
		</>
	);
};

export default ProjectInfo;
