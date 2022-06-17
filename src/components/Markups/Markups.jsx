import { useState, useEffect, useMemo, useContext } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';

import CreateMarkup from './CreateMarkup';
import Viewer from './Viewer';

import { MarkupContext } from './Context';

const Markups = () => {
	const [markupList, setMarkupList] = useState([]);
	const [selectedMarkup, setSelectedMarkup] = useState('');
	const [isCreating, setIsCreating] = useState(false);
	const [markup, setMarkup] = useState(null);
	const [goHome, setGoHome] = useState(null);
	const [sectionExtension, setSectionExtension] = useState(null);

	const selectedMarkupValue = useMemo(
		() => ({ selectedMarkup, setSelectedMarkup }),
		[selectedMarkup, setSelectedMarkup],
	);

	const onModelLoaded = async (viewer, data) => {
		console.log('Model finished loading');

		// let viewerDocument = viewer.model.getDocumentNode().getDocument();

		let markupExt = await viewer.loadExtension('Autodesk.Viewing.MarkupsCore');
		setMarkup(markupExt);
		await viewer.loadExtension('Autodesk.Viewing.MarkupsGui');

		var measureExtension = viewer.getExtension('Autodesk.Measure');
		measureExtension.setUnits('m');

		let gohome = await viewer.loadExtension('Autodesk.GoHome');
		setGoHome(gohome);

		let sectionExtension = await viewer.loadExtension('Autodesk.Section');
		setSectionExtension(sectionExtension);
	};

	const enterEditMarkup = () => {
		markup.enterEditMode();
	};

	const exitEditMarkup = () => {
		markup.leaveEditMode();
		markup.hide();
	};

	const resetView = async () => {
		// window.NOP_VIEWER.isolate();
		// window.NOP_VIEWER.fitToView();
		console.log('reset the view!');
		// await window.NOP_VIEWER.showAll();
		// await window.NOP_VIEWER.restoreState(null);
		// window.NOP_VIEWER.setCutPlanes(null);

		// window.NOP_VIEWER.restoreState(JSON.parse('{"cutplanes": null}'));
		goHome.activate();
		sectionExtension.activate('x');
		sectionExtension.deactivate();
	};

	return (
		<MarkupContext.Provider value={selectedMarkupValue}>
			{isCreating ? (
				<>
					<Button
						onClick={() => {
							exitEditMarkup();
							setIsCreating(false);
						}}
					>
						Cancel
					</Button>
					<CreateMarkup markup={markup} />
				</>
			) : (
				<>
					<Button
						onClick={() => {
							setIsCreating(true);
							enterEditMarkup();
						}}
					>
						Create
					</Button>
					<Button
						onClick={() => {
							resetView();
						}}
					>
						Reset view
					</Button>
				</>
			)}

			<Viewer onModelLoaded={onModelLoaded} />
		</MarkupContext.Provider>
	);
};

export default Markups;
