import { useState, useEffect } from 'react';
import axios from 'axios';

const companyKeyMap = {
	0: 'docType',
	1: '美商科進栢誠工程顧問有限公司台灣分公司',
	3: '內政部警政署警察通訊所通訊器材科',
	4: '內政部警政署警察通訊所',
	5: '臺灣銀行採購部',
	8: '內政部警政署',
	9: '李委員民慶',
	10: '林委員昇和',
	11: '張委員元政',
	12: '高雄市政府警察局',
	13: '行政院公共工程委員會',
	14: '三商電腦股份有限公司',
};
// const columns = ['docType', '美商科進栢誠工程顧問有限公司台灣分公司', '內政部警政署警察通訊所通訊器材科', '內政部警政署警察通訊所', '臺灣銀行採購部', '內政部警政署', '高雄市政府警察局', '行政院公共工程委員會', '三商電腦股份有限公司'];

// let initialColumns = ['docType'];
// const columns = initialColumns.concat(Object.values(companyKeyMap));

const columns = Object.values(companyKeyMap);

const SERVER_URL = 'http://104.155.232.74:8080';

export const useData = () => {
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
			console.log(receiveData);

			let tempReceiveObj = { docType: '收文' };
			let tempSendObj = {
				docType: '發文',
				美商科進栢誠工程顧問有限公司台灣分公司: 0,
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

			let replacedItems = Object.keys(tempReceiveObj).map((key) => {
				const newKey = companyKeyMap[key] || key;
				return { [newKey]: tempReceiveObj[key] };
			});
			const newTab = replacedItems.reduce((a, b) => Object.assign({}, a, b));
			const outputArr = [newTab, tempSendObj];
			outputArr.columns = columns;

			setProcessedData(outputArr);
		}
	}, [receiveData, sendData]);

	return processedData;
};
