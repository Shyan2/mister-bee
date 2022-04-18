import { useState, useEffect } from 'react';
import axios from 'axios';

const columns = ['docType', '美商科進栢誠工程顧問有限公司台灣分公司', '3', '4', '5', '8', '12', '13', '14'];

const companyKeyMap = {
	0: 'docType',
	1: '科進栢誠', // 美商科進栢誠工程顧問有限公司台灣分公司
	3: '警政署材科', // 內政部警政署警察通訊所通訊器材科
	4: '內政部警政署警察通訊所',
	5: '臺灣銀行採購部',
	8: '內政部警政署',
	9: '李委員民慶',
	10: '林委員昇和',
	11: '張委員元政',
	12: '高雄市政府警察局',
	13: '行政院公共工程委員會',
	14: '三商電腦股份有限公司',
	15: '中華電信企業客戶分公司',
	16: '高雄85大樓管理中心',
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
		setSendData(result.data.recordset);
	};

	// Need 2 processData because Data in the database is not consistent...
	const processData = async (data) => {
		await data.forEach((row) => {
			row.id = row.DELIVER_NO;
			row.docType = '收文';
			row.sender = companyKeyMap[row.DELIVER_UNIT];
			row.receiver = companyKeyMap[1]; // could be multiple
			// row.DELIVER_UNIT = companyKeyMap[row.DELIVER_UNIT];
			row.DELIVER_LETTER_TYPE = letterTypeMap[row.DELIVER_LETTER_TYPE];
			row.RECEIVE_DATE = new Date(row.RECEIVE_DATE);
		});
	};

	const processSendData = async (data) => {
		await data.forEach((row) => {
			row.id = row.DELIVER_NUMBER;
			row.docType = '發文';
			row.sender = companyKeyMap[1];
			row.receiver = companyKeyMap[row.RECE_NAME_TKEY];
			row.DELIVER_LETTER_TYPE = letterTypeMap[row.DELIVER_LETTER_TYPE];
			row.RECEIVE_DATE = new Date(row.DELIVER_DATE);
		});
	};

	useEffect(() => {
		fetchReceieveData();
		fetchSendData();
	}, []);

	// 2 useEffects to reduce overlap executions
	useEffect(() => {
		if (receiveData && sendData) {
			// process data
			processData(receiveData);
			processSendData(sendData);
			setData([...receiveData, ...sendData]);
			// setData(...new Set([...receiveData, ...sendData]));
		}
	}, [receiveData, sendData]);

	return data;
};
