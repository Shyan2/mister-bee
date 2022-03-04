/*global Autodesk*/
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { SelectedObjectContext } from './Context';
import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CompareDataTable from './CompareDataTable';
const SERVER_URL = process.env.REACT_APP_API_ROUTE;
const AV = Autodesk.Viewing;

const Compare2d = (props) => {
	const { selectedObject, setSelectedObject } = useContext(SelectedObjectContext);
	const [compareModelUrn, setCompareModelUrn] = useState(null);

	const [accessToken, setAccessToken] = useState(null);

	const [defaultModel, setDefaultModel] = useState(null);
	const [compareModel, setCompareModel] = useState(null);

	const [pcExt, setpcExt] = useState(null);

	useEffect(() => {
		const getNewToken = async () => {
			const newToken = await axios.get(`${SERVER_URL}/api/forge/getToken`);
			setAccessToken(newToken.data.access_token);
		};
		getNewToken();

		if (accessToken) {
			initializeViewer();
		}
		if (viewerRef.current) {
			viewerRef.current.finish();
		}
	}, [accessToken]);

	const viewerRef = useRef(null);
	const viewerDomRef = useRef(null);

	// const onModelLoaded = (event) => {
	// 	const viewer = viewerRef.current;

	// 	viewer.removeEventListener(AV.GEOMETRY_LOADED_EVENT, onModelLoaded);

	// 	if (props?.onModelLoaded) {
	// 		props.onModelLoaded(viewer, event);
	// 	}
	// };

	const initializeViewer = async () => {
		const viewerOptions = {
			accessToken: accessToken,
			env: 'AutodeskProduction2',
			api: 'streamingV2',
		};

		AV.Initializer(viewerOptions, async () => {
			const viewer = new Autodesk.Viewing.GuiViewer3D(viewerDomRef.current, {});

			viewerRef.current = viewer;

			const startedCode = viewer.start(undefined, undefined, undefined, undefined, viewerOptions);
			if (startedCode > 0) {
				console.error('Failed to create a Viewer: WebGL not supported.');
				return;
			}
			var pcExt = await viewer.loadExtension('Autodesk.Viewing.PixelCompare');
			setpcExt(pcExt);
			loadModel(viewer, selectedObject.urn);
		});
	};

	const loadModel = async (viewer, documentId) => {
		const onDocumentLoadSuccess = async (viewerDocument) => {
			const defaultModel = viewerDocument.getRoot().getDefaultGeometry();
			const model1 = await viewer.loadDocumentNode(viewerDocument, defaultModel, {
				keepCurrentModels: true,
			});
			setDefaultModel(model1);
		};

		const onDocumentLoadFailure = () => {
			console.error('Failed fetching Forge manifest');
		};

		AV.Document.load(`urn:${documentId}`, onDocumentLoadSuccess, onDocumentLoadFailure);
	};

	const addDocCompare = async (viewer, documentId) => {
		const onDocumentLoadSuccess = async (viewerDocument) => {
			const compareModel = viewerDocument.getRoot().getDefaultGeometry();
			const model2 = await viewer.loadDocumentNode(viewerDocument, compareModel, {
				keepCurrentModels: true,
			});
			setCompareModel(model2);
		};

		const onDocumentLoadFailure = () => {
			console.error('Failed fetching Forge manifest');
		};

		AV.Document.load(`urn:${documentId}`, onDocumentLoadSuccess, onDocumentLoadFailure);
	};

	useEffect(() => {
		if (compareModel) {
			pcExt.compareTwoModels(defaultModel, compareModel);
		}
	}, [compareModel]);

	useEffect(() => {
		if (compareModelUrn) {
			addDocCompare(viewerRef.current, compareModelUrn);
		} else {
			pcExt?.deactivate();
		}
	}, [compareModelUrn]);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" elevation={0}>
					<Toolbar variant="dense">
						<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
							<ArrowBackIcon
								onClick={() => {
									setSelectedObject({});
									setDefaultModel(null);
									setCompareModel(null);
								}}
							/>
						</IconButton>
						<Typography variant="h6" color="inherit" component="div">
							{selectedObject.name} - 版本比較
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Container maxWidth={false}>
				<Grid container>
					<Grid item xs={3}>
						<CompareDataTable
							compareModelUrn={compareModelUrn}
							setCompareModelUrn={setCompareModelUrn}
							projectID={props.projectID}
						/>
					</Grid>
					<Grid item xs={9}>
						<div id="compareViewerContainer" ref={viewerDomRef}></div>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Compare2d;
