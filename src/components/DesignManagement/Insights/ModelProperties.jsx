import { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Container, Grid } from '@mui/material';

import { useData } from './useData';

import CirclePacking from './CirclePacking';
import PropertiesTable from './PropertiesTable';
import Barchart from './Barchart/Barchart';
import Viewer from './Viewer';
import { scaleSqrt, max } from 'd3';

import { useWindowSize } from './useWindowSize';

const width = 750;
const height = 600;

const sizeValue = (d) => d['Count'];
const maxRadius = 50;

const margin = {
	top: 100,
	right: 50,
	bottom: 70,
	left: 100,
};

const fadeOpacity = 0.2;

const ModelProperties = ({ projectId, indexId, queryId }) => {
	const data = useData(projectId, indexId, queryId);
	const [isLoading, setIsLoading] = useState(false);
	const [modelProperties, setModelProperties] = useState([]);

	const [hoveredValue, setHoveredValue] = useState(null);
	const [selectedValue, setSelectedValue] = useState(null);

	const [windowWidth, windowHeight] = useWindowSize();

	const escFunction = useCallback((event) => {
		if (event.key === 'Escape') {
			// window.NOP_VIEWER.utilities.goHome();
			setSelectedValue(null);
			window.NOP_VIEWER.isolate(null);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', escFunction, false);

		return () => {
			document.removeEventListener('keydown', escFunction, false);
		};
	}, []);

	useEffect(() => {
		if (selectedValue) {
			// need to turn it into an array of svfIds
			let returnArray = [];
			filteredData.map((item) => {
				returnArray.push(item.svf2Id);
			});
			window.NOP_VIEWER.isolate(returnArray);
			window.NOP_VIEWER.select(returnArray);
			window.NOP_VIEWER.fitToView(returnArray);
		}
	}, [selectedValue]);

	useEffect(() => {
		if (data) {
			setIsLoading(false);
			setModelProperties(data);
		} else {
			setIsLoading(true);
		}
	}, [data]);

	const ProcessBarChartData = (inputData) => {
		let result = [];
		if (inputData) {
			inputData.forEach((item) => {
				let resObj = result.find((resObj) => resObj.revitCategory === item.revitCategory);
				resObj ? resObj.Count++ : result.push({ revitCategory: item.revitCategory, Count: 1 });
			});
		}

		// to remove items with count < 30. This is to clean the data for show
		const filteredResult = result.filter(function (el) {
			return el.Count > 10;
		});
		return filteredResult;
	};

	const ProcessCirclePackingData = (inputData) => {
		let result = [];
		let finalResult = [];

		if (inputData) {
			inputData.forEach((item) => {
				let resObj = result.find((resObj) => resObj.revitFamily === item.revitFamily);
				resObj ? resObj.Count++ : result.push({ revitFamily: item.revitFamily, Count: 1 });
			});
			const sizeScale = scaleSqrt()
				.domain([0, max(result, sizeValue)])
				.range([0, maxRadius]);

			result.forEach((item) => {
				// item.size = +item.Count / 2;
				// item.size < 3 ? (item.radius = 3) : (item.radius = item.size);
				item.radius = sizeScale(sizeValue(item));
				finalResult.push(item);
			});
		}

		return finalResult;
	};

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	// filter if selectedValue
	const filteredData = selectedValue
		? modelProperties.filter((d) => {
				return d.revitCategory === selectedValue;
		  })
		: modelProperties;

	return (
		<Box sx={{ m: 1 }}>
			<Grid container spacing={0.5}>
				<Grid item sm={12} lg={4}>
					<PropertiesTable items={filteredData} isLoading={isLoading} />
				</Grid>
				<Grid container item sm={8}>
					<Grid item sm={5} lg={6}>
						<Viewer />
					</Grid>
					<Grid item sm={5} lg={6}>
						{isLoading ? (
							<pre>Loading ...</pre>
						) : (
							<>
								<Box
									sx={{ mt: 2 }}
									style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
								>
									<Typography variant="h4">Model Family Distribution</Typography>
								</Box>
								<div id="container">
									<svg id="container-svg" width={windowWidth * 0.3} height={windowHeight * 0.3}></svg>
									<div id="tooltip"></div>
								</div>
							</>
						)}
					</Grid>
					<Grid item sm={12}>
						{isLoading ? (
							<pre>Loading ... </pre>
						) : (
							<>
								<Box style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
									<Typography variant="h4">Quantity Take-off Categories</Typography>
								</Box>
								<Barchart
									data={ProcessBarChartData(modelProperties)}
									onHover={setHoveredValue}
									hoveredValue={hoveredValue}
									onSelect={setSelectedValue}
									selectedValue={selectedValue}
									fadeOpacity={fadeOpacity}
									width={windowWidth * 0.62}
									height={windowHeight * 0.34}
								/>
							</>
						)}
					</Grid>
				</Grid>

				<CirclePacking
					data={ProcessCirclePackingData(filteredData)}
					width={windowWidth * 0.3}
					height={windowHeight * 0.3}
				/>
			</Grid>
		</Box>
	);
};

export default ModelProperties;
