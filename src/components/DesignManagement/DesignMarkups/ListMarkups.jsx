import { useState, useEffect } from 'react';
import MarkupViewer from './MarkupViewer';
import { Button, CircularProgress } from '@mui/material';

const ListMarkups = ({ selectedObject }) => {
	const [markup, setMarkup] = useState(null);
	const [sectionExtension, setSectionExtension] = useState(null);
	const [goHome, setGoHome] = useState(null);

	const onModelLoaded = async (viewer, data) => {
		// console.log('Model finished loading');

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

	const loadMarkup = async () => {
		// console.log(markup);
		console.log(selectedObject);
		await markup.show();
		await markup.viewer.restoreState(selectedObject.viewerState, null, true);
		await markup.loadMarkups(selectedObject.svgString, 'layer 1');
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

	// useEffect(() => {
	// 	loadMarkup();
	// }, []);

	return (
		<>
			<Button onClick={() => loadMarkup()}>Load Markup</Button>
			<MarkupViewer onModelLoaded={onModelLoaded} />
		</>
	);
};

export default ListMarkups;
