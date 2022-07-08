/* global Autodesk */
import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { SelectedItemContext, ViewingItemContext } from './Context';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const Viewer = (props) => {
	const Autodesk = window.Autodesk;
	const AV = Autodesk.Viewing;
	const { viewingItem, setViewingItem } = useContext(ViewingItemContext);

	const urn = viewingItem.id;
	const [accessToken, setAccessToken] = useState(null);

	useEffect(() => {
		const getNewToken = async () => {
			const newToken = await axios.get(`${SERVER_URL}/api/forge/getToken`);
			setAccessToken(newToken.data.access_token);
		};
		getNewToken();

		if (accessToken && urn) {
			initializeViewer();
		}

		if (viewerRef.current) {
			viewerRef.current.finish();
		}
	}, [urn, accessToken]);

	const viewerRef = useRef(null);
	const viewerDomRef = useRef(null);

	const onModelLoaded = (event) => {
		const viewer = viewerRef.current;

		viewer.removeEventListener(AV.GEOMETRY_LOADED_EVENT, onModelLoaded);

		if (props?.onModelLoaded) {
			props.onModelLoaded(viewer, event);
		}
	};

	const initializeViewer = () => {
		const viewerOptions = {
			accessToken: accessToken,
			env: 'AutodeskProduction2',
			api: 'streamingV2',
		};

		AV.Initializer(viewerOptions, async () => {
			Autodesk.Viewing.Private.InitParametersSetting.alpha = true;
			const viewer = new Autodesk.Viewing.GuiViewer3D(viewerDomRef.current, {
				extensions: ['Autodesk.DocumentBrowser'],
			});
			// const viewer = new Autodesk.Viewing.Viewer3D(viewerDomRef.current); //headless view

			viewerRef.current = viewer;

			const startedCode = viewer.start(undefined, undefined, undefined, undefined, viewerOptions);
			if (startedCode > 0) {
				console.error('Failed to create a Viewer: WebGL not supported.');
				return;
			}

			viewer.addEventListener(AV.GEOMETRY_LOADED_EVENT, onModelLoaded, {
				once: true,
			});

			loadModel(viewer, urn);

			if (props?.onViewerInitialized) {
				props.onViewerInitialized(viewer);
			}
		});
	};

	const loadModel = (viewer, documentId) => {
		viewer.impl.renderer().setClearAlpha(0);
		viewer.impl.glrenderer().setClearColor(0xffffff, 0);
		viewer.impl.invalidate(true);
		const onDocumentLoadSuccess = (viewerDocument) => {
			// viewerDocument is an instance of Autodesk.Viewing.Document
			// const defaultModel = viewerDocument.getRoot().getDefaultGeometry(true); // does not load links
			const defaultModel = viewerDocument.getRoot().getDefaultGeometry();
			viewer.loadDocumentNode(viewerDocument, defaultModel, {
				keepCurrentModels: true,
			});

			// since ghosting is heavy, turn off
			// viewer?.prefs?.set('ghosting', false);
		};

		const onDocumentLoadFailure = () => {
			console.error('Failed fetching Forge manifest');
		};

		if (documentId) {
			AV.Document.load(`urn:${documentId}`, onDocumentLoadSuccess, onDocumentLoadFailure);
		}
	};

	// useEffect(() => {
	// 	if (urn) {
	// 		initializeViewer();
	// 	}

	// 	if (viewerRef.current) {
	// 		viewerRef.current.finish();
	// 		// Autodesk.Viewing.shutdown();
	// 	}
	// }, [accessToken]);
	/// END VIEWER
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" elevation={0}>
					<Toolbar variant="dense">
						<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
							{/* <Button
								onClick={() => {
									setSelectedObject({});
								}}
							>
								Back
							</Button> */}
							<ArrowBackIcon
								onClick={() => {
									setViewingItem({});
								}}
							/>
						</IconButton>
						<Typography variant="h6" color="inherit" component="div">
							{viewingItem.name}
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<div id="viewerContainer" ref={viewerDomRef}></div>
		</>
	);
};

export default Viewer;
Viewer.displayName = 'Viewer';
