import { useState, useEffect } from 'react';
import axios from 'axios';

const columns = ['docType', '美商科進栢誠工程顧問有限公司台灣分公司', '3', '4', '5', '8', '12', '13', '14'];

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

const letterTypeMap = {
	1: '書函',
	2: '函',
	5: '開會通知',
};

const SERVER_URL = 'http://104.155.232.74:8080';

export const useData = () => {
	const [receiveData, setReceiveData] = useState(null);
	const [sendData, setSendData] = useState(null);
	const [data, setData] = useState(null);

	const fetchReceieveData = async () => {
		const result = await axios.get(`${SERVER_URL}/api/pmis/getreceivedocs`);
		setReceiveData(result.data.recordset);
	};

	const fetchSendData = async () => {
		const result = await axios.get(`${SERVER_URL}/api/pmis/getsenddocs`);
		console.log(result.data);
		setSendData(result.data.recordset);
	};

	const processData = (data) => {
		// replace some digits with the map
		data.forEach((row) => {
			// replace row.DELIEVER_UNIT, row.DELIVER_LETTER_TYPE
			// fix time of RECEIEVE_DATA
			row.DELIVER_UNIT = companyKeyMap[row.DELIVER_UNIT];
			row.DELIVER_LETTER_TYPE = letterTypeMap[row.DELIVER_LETTER_TYPE];
			row.RECEIVE_DATE = new Date(row.RECEIVE_DATE);
		});
	};

	useEffect(() => {
		fetchReceieveData();
		fetchSendData();
	}, []);

	useEffect(() => {
		if (receiveData) {
			// process data
			processData(receiveData);
			setData(receiveData);
		}
	}, [receiveData]);

	return data;
};
