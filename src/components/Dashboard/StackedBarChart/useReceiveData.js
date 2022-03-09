import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const columns = ['docType', '美商科進栢誠工程顧問有限公司台灣分公司', '3', '4', '5', '8', '12', '13', '14'];
export const useReceiveData = () => {
	const [receiveData, setReceiveData] = useState(null);
	const [sendData, setSendData] = useState(null);
	const [processedData, setProcessedData] = useState(null);

	const fetchReceieveData = async () => {
		const result = await axios.get(`${SERVER_URL}/api/pmis/getreceivedocs`);
		setReceiveData(result.data.recordset);
	};

	const fetchSendData = async () => {
		const result = await axios.get(`${SERVER_URL}/api/pmis/getsenddocs`);
		setSendData(result.data.recordset);
	};

	useEffect(() => {
		fetchReceieveData();
		fetchSendData();
	}, []);

	useEffect(() => {
		// process data
		// console.log(data);
		if (receiveData && sendData) {
			let tempReceiveObj = { docType: '收文', 美商科進栢誠工程顧問有限公司台灣分公司: 0 };
			let tempSendObj = {
				docType: '發文',
				美商科進栢誠工程顧問有限公司台灣分公司: 0,
				3: 0,
				4: 0,
				5: 0,
				8: 0,
				12: 0,
				13: 0,
				14: 0,
			};

			if (receiveData) {
				receiveData.forEach((row) => {
					!(row['DELIVER_UNIT'] in tempReceiveObj)
						? (tempReceiveObj[row['DELIVER_UNIT']] = 1)
						: (tempReceiveObj[row['DELIVER_UNIT']] += 1);
				});

				if (sendData) {
					sendData.forEach((row) => {
						tempSendObj['美商科進栢誠工程顧問有限公司台灣分公司'] += 1;
					});
				}
				// console.log(tempObj);
			}

			const outputArr = [tempReceiveObj, tempSendObj];
			outputArr.columns = columns;
			setProcessedData(outputArr);
		}
	}, [receiveData, sendData]);

	return processedData;
};
