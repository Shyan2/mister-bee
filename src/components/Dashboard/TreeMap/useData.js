import { useState, useEffect } from 'react';

import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_API_ROUTE;

export const useData = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const getSheetData = async () => {
			const result = await axios.get(`${SERVER_URL}/api/google/sheet/getTreeMapData`);

			let returnValues = result.data.values;
			let outputArray = [];

			let first;
			let second;
			returnValues.map((row, index) => {
				if (index === 0) {
					outputArray.columns = row;
					first = row[0];
					second = row[1];
				} else {
					outputArray.push(
						Object.assign({ [first]: row[0] }, { [second]: +row[1] }, { name: row[0] }, { value: +row[1] }),
					);
				}
			});

			setData(outputArray);
		};

		getSheetData();
	}, []);

	return data;
};
