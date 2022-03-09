import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
	'https://gist.githubusercontent.com/Shyan2/571577bbf4ec103215c937d3121d41e7/raw/49c263f3b733a743d4a3e017b207950295be51a0/projectProgress.csv';

export const useData = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const row = (d) => {
			let returnItem = {};
			returnItem.item = d.item;
			returnItem.plannedProgress = +d['預定進度'];
			returnItem.realProgress = +d['實際進度'];
			return returnItem;
		};

		csv(csvUrl, row).then(setData);
	}, []);

	return data;
};
