import { useState, useEffect } from 'react';
import axios from 'axios';
import MarkupsTable from './MarkupsTable';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const DesignMarkups = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// fetch markup data from Mongo
	let itemList = [];
	useEffect(() => {
		const fetchItems = async () => {
			setIsLoading(true);
			const result = await axios.get(`${SERVER_URL}/markups`);
			// console.log(result.data);

			// set the markups data here
			result.data.forEach((item) => {
				console.log(item);
				itemList.push({
					id: item._id,
					status: item.status,
					description: item.description,
					svgString: item.svgString,
					viewerState: item.viewerState,
					project: '2800506A',
					urn: item.urn,
					creatorName: item.creatorName,
				});
			});

			setItems(itemList);
			setIsLoading(false);
		};
		fetchItems();
	}, []);

	return <MarkupsTable items={items} isLoading={isLoading} />;
};

export default DesignMarkups;
