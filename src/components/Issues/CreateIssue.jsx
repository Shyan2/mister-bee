import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';

import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const CreateIssue = ({ markup }) => {
	const [markupSVG, setMarkupSVG] = useState(null);
	const [viewerState, setViewerState] = useState(null);
	const [issueData, setIssueData] = useState({
		id: '',
		title: '',
		status: '',
		priority: '',
		description: '',
		selectedFile: '',
		assignedTo: '',
		expectedDueDate: '',
		actualDueDate: '',
		impactSummary: '',
		actionSteps: '',
		issueType: '',
		project: '',
		creatorName: '',
		pushpin_attributes: {},
		comments: '',
		tags: '',
		svgString: '',
		viewerState: {},
	});

	const clear = () => {
		setIssueData({
			id: '',
			title: '',
			description: '',
			selectedFile: '',
			assignedTo: '',
			xpos: '',
			ypos: '',
			zpos: '',
			svgString: '',
			viewerState: {},
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(issueData);
		// send to mongodb
		// need to add a createdBy
		const result = await axios.post(`${SERVER_URL}/issues`, {
			...issueData,
		});
		console.log(result);
		clear();
	};

	return (
		<div>
			{/* <Markup markup={markup} /> */}
			<Paper>
				<form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Typography variant="h6">Create a new Issue</Typography>
					{/* <TextField
          name='id'
          variant='outlined'
          label='ID'
          fullWidth
          value={issueData.id}
          onChange={(e) => setIssueData({ ...issueData, id: e.target.value })}
        /> */}
					<TextField
						name="creatorName"
						variant="outlined"
						label="Creator Name"
						fullWidth
						value={issueData.creatorName}
						onChange={(e) => setIssueData({ ...issueData, creatorName: e.target.value })}
					/>
					<TextField
						name="title"
						variant="outlined"
						label="Title"
						fullWidth
						value={issueData.title}
						onChange={(e) => setIssueData({ ...issueData, title: e.target.value })}
					/>
					<TextField
						name="description"
						variant="outlined"
						label="Description"
						fullWidth
						value={issueData.description}
						onChange={(e) => setIssueData({ ...issueData, description: e.target.value })}
					/>
					<TextField
						name="assignedTo"
						variant="outlined"
						label="Assign to"
						fullWidth
						value={issueData.assignedTo}
						onChange={(e) => setIssueData({ ...issueData, assignedTo: e.target.value })}
					/>

					{/* <TextField
						name="svgString"
						variant="outlined"
						label="SVG"
						fullWidth
						value={issueData.svgString}
						onChange={(e) => setIssueData({ ...issueData, svgString: e.target.value })}
					/>

					<TextField
						name="viewerState"
						variant="outlined"
						label="Viewer State"
						fullWidth
						value={issueData.viewerState}
						onChange={(e) => setIssueData({ ...issueData, viewerState: e.target.value })}
					/> */}

					<Button
						variant="contained"
						color="primary"
						size="large"
						type="submit"
						fullWidth
						onClick={() => {
							// saveMarkups();
							console.log('submit clicked!');
						}}
					>
						Create Issue
					</Button>

					<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
						Clear
					</Button>
				</form>
			</Paper>
		</div>
	);
};

export default CreateIssue;
