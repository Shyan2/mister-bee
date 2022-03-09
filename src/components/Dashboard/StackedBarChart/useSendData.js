import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

export const useSendData = () => {
	const [data, setData] = useState(null);

	const fetchSendData = async () => {
		const result = await axios.get(`${SERVER_URL}/api/pmis/getsenddocs`);
		setData(result.data.recordset);
	};

	useEffect(() => {
		fetchSendData();
	}, []);

	return data;
};
