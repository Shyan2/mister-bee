import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
	'https://gist.githubusercontent.com/Shyan2/a9128accd50a8a4164d45976af93ac7e/raw/713a715ce973b354ff45c0251c6bc6ea43c9d3bd/pieChart.csv';

// const csvUrl =
// 	'https://gist.githubusercontent.com/Shyan2/bead68a715a8fe85201c1e1d55461c20/raw/d1f3058cdd36673be059905fc4f7af094c25ca01/gistfile1.csv';

export const useData = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const row = (d) => {
			d.name = d['項目'];
			d.value = +d['金額'];
			return d;
		};

		csv(csvUrl, row).then(setData);
	}, []);

	return data;
};
