import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Container, CircularProgress, Grid } from '@mui/material';
import Viewer from './Viewer';
import CreateIssue from './CreateIssue';

const Issues = () => {
	const [pushPinExtension, setPushPinExtension] = useState(null);
	let newPinId;
	// let pushPinExtension;

	const [pinInfo, _setPinInfo] = useState(null);

	const pinInfoRef = useRef(pinInfo);

	const setPinInfo = (x) => {
		pinInfoRef.current = x;
		_setPinInfo(x);
	};

	const loadExtensionFunc = async () => {
		const extensionOptions = {
			hideIssuesButton: false,
			hideFieldIssuesButton: true,
		};

		const pushPinExtensionHandle = await window.NOP_VIEWER.loadExtension(
			'Autodesk.BIM360.Extension.PushPin',
			extensionOptions,
		);
		setPushPinExtension(pushPinExtensionHandle);
		// pushPinExtension = pushPinExtensionHandle;
		console.log(pushPinExtensionHandle);

		pushPinExtensionHandle.pushPinManager.addEventListener('pushpin.created', (e) => {
			pushPinExtensionHandle.endCreateItem();
			newPinId = e.value.itemData.id;
			// setPinId(newPinId);
			pushPinExtensionHandle.setDraggableById(newPinId, true);
			const tempPinInfo = pushPinExtensionHandle.getItemById(newPinId);
			console.log(tempPinInfo);
			setPinInfo(tempPinInfo);

			console.log('created pushpin');
		});

		pushPinExtensionHandle.pushPinManager.addEventListener('pushpin.modified', (e) => {
			newPinId = e.value.itemData.id;
			const tempPinInfo = pushPinExtensionHandle.getItemById(newPinId);
			console.log(tempPinInfo);
			setPinInfo(tempPinInfo);
		});
	};

	const onModelLoaded = async (viewer, data) => {
		loadExtensionFunc();
	};

	const createPushPin = async () => {
		pushPinExtension.startCreateItem({ label: 'New', status: 'open', type: 'issues' });
	};

	return (
		<Container maxWidth={false} disableGutters>
			{!pinInfo ? (
				<Button
					onClick={() => {
						createPushPin();
					}}
				>
					Create pushpin
				</Button>
			) : (
				<Button onClick={() => console.log(pinInfo)}>Print pushpin Info</Button>
			)}

			<Grid container>
				<Grid item lg={4}>
					<CreateIssue />
				</Grid>
				<Grid item lg={8}>
					<Viewer onModelLoaded={onModelLoaded} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Issues;
