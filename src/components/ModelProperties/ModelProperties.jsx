import { useState, useEffect } from 'react';

import { useData } from './useData';

import PropertiesTable from './PropertiesTable';
import Barchart from './Barchart/Barchart';
import Viewer from './Viewer';

const ModelProperties = () => {
	const data = useData();
	const [isLoading, setIsLoading] = useState(false);
	const [modelProperties, setModelProperties] = useState([]);

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
		return result;
	};
	return (
		<>
			<div>
				<Barchart data={ProcessBarChartData(modelProperties)} />
			</div>
			<div>
				<Viewer />
			</div>
			<div>{<PropertiesTable items={modelProperties} isLoading={isLoading} />}</div>
		</>
	);
};

export default ModelProperties;
