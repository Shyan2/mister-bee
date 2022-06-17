import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';

import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const CreateMarkup = ({ markup }) => {
	const [markupSVG, setMarkupSVG] = useState(null);
	const [viewerState, setViewerState] = useState(null);

	const [markupData, setMarkupData] = useState({
		id: '',
		description: '',
		selectedFile: '',
		status: '',
		project: '',
		creatorName: '',
		svgString: '',
		urn: '',
		viewerState: {},
	});

	const clear = () => {
		setMarkupData({
			id: '',
			description: '',
			selectedFile: '',
			status: '',
			project: '',
			creatorName: '',
			svgString: '',
			urn: '',
			viewerState: {},
		});
	};

	const saveMarkups = async () => {
		setMarkupSVG(markup.generateData());
		setViewerState(markup.viewer.getState());
		console.log(markupSVG);
		console.log(viewerState);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(markupData);
		// send to mongodb
		// need to add a createdBy
		const result = await axios.post(`${SERVER_URL}/markups`, {
			...markupData,
			urn: viewerState.seedURN,
			svgString: markupSVG,
			viewerState: viewerState,
		});
		console.log(result);
		console.log(markupSVG);
		console.log(viewerState);
		clear();
	};

	return (
		<>
			<form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Typography variant="h6">Create a new Markup</Typography>

				<TextField
					name="creatorName"
					variant="outlined"
					label="Creator Name"
					fullWidth
					value={markupData.creatorName}
					onChange={(e) => setMarkupData({ ...markupData, creatorName: e.target.value })}
				/>
				<TextField
					name="description"
					variant="outlined"
					label="Description"
					fullWidth
					value={markupData.description}
					onChange={(e) => setMarkupData({ ...markupData, description: e.target.value })}
				/>
				<TextField
					name="status"
					variant="outlined"
					label="Status"
					fullWidth
					value={markupData.status}
					onChange={(e) => setMarkupData({ ...markupData, status: e.target.value })}
				/>

				<Button
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
					onClick={() => {
						saveMarkups();
					}}
				>
					Save Markup
				</Button>

				<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
					Clear
				</Button>
			</form>
		</>
	);
};

export default CreateMarkup;
