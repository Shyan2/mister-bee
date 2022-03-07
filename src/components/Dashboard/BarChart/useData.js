import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
	'https://gist.githubusercontent.com/Shyan2/1a7b7d883059d4e22d8e9eadaac61c52/raw/8a65da0851099eb6c47b2c85a9f135f35e6bf91e/barChart.csv';

export const useData = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const row = (d) => {
			d['Year'] = d['Year'];
			d['Facade'] = +d['Facade'];
			d['TB B2-L3 (+Gatehouse)'] = +d['TB B2-L3 (+Gatehouse)'];
			d['NC (+Gatehouse+NLB)'] = +d['NC (+Gatehouse+NLB)'];
			d['SC (+Gatehouse+NLB)'] = +d['SC (+Gatehouse+NLB)'];
			d['TB B2-L3 (+Gatehouse)'] = +d['TB B2-L3 (+Gatehouse)'];
			d['Roof and Cloud Ceiling'] = +d['Roof and Cloud Ceiling'];
			d['MFB'] = +d['MFB'];
			return d;
		};

		csv(csvUrl, row).then(setData);
	}, []);

	return data;
};
