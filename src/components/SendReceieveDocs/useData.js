import { useState, useEffect } from 'react';
import axios from 'axios';

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
const PROJECTID = '2800397A';

export const useData = () => {
	const [receiveData, setReceiveData] = useState(null);
	const [sendData, setSendData] = useState(null);
	const [data, setData] = useState(null);

	const [companyDataMap, setCompanyDataMap] = useState(null);
	const [letterType, setLetterType] = useState(null);

	const fetchLetterType = async () => {
		const result = await axios.get(`${SERVER_URL}/api/pmis/comp/getType?projectId=${PROJECTID}`);
		let letterMap = {};
		result.data.map((item) => {
			letterMap[item.TKEY] = item.LETTER;
		});
		// console.log(letterMap);
		setLetterType(letterMap);
	};

	const fetchCompanyData = async () => {
		const result = await axios.get(`${SERVER_URL}/api/pmis/comp/getComp?projectId=${PROJECTID}`);
		let companyMap = {};
		result.data.map((item) => {
			companyMap[item.TKEY] = item.comp_name;
		});
		// console.log(companyMap);
		setCompanyDataMap(companyMap);
	};

	// need to send the project ID
	const fetchReceieveData = async () => {
		const result = await axios.get(`${SERVER_URL}/api/pmis/getreceivedocs?projectId=${PROJECTID}`);
		setReceiveData(result.data.recordset);
		// console.log(result.data.recordset);
	};

	const fetchSendData = async () => {
		const result = await axios.get(`${SERVER_URL}/api/pmis/getsenddocs?projectId=${PROJECTID}`);
		setSendData(result.data.recordset);
	};

	// Need 2 processData because Data in the database is not consistent...
	const processData = async (data) => {
		await data.forEach((row) => {
			row.docType = '收文';
			row.id = row.DELIVER_NO;
			row.sender = companyDataMap[row.DELIVER_UNIT];
			row.receiver = companyDataMap[1]; // could be multiple
			// row.DELIVER_UNIT = companyKeyMap[row.DELIVER_UNIT];
			row.DELIVER_LETTER_TYPE = letterType[row.DELIVER_LETTER_TYPE];
			row.RECEIVE_DATE = new Date(row.RECEIVE_DATE);
		});
	};

	const processSendData = async (data) => {
		await data.forEach((row) => {
			row.docType = '發文';
			row.id = row.DELIVER_NUMBER;
			row.sender = companyDataMap[1];
			row.receiver = companyDataMap[row.RECE_NAME_TKEY];
			row.DELIVER_LETTER_TYPE = letterType[row.DELIVER_LETTER_TYPE];
			row.RECEIVE_DATE = new Date(row.DELIVER_DATE);
		});
	};

	useEffect(() => {
		fetchCompanyData();
		fetchLetterType();
	}, []);

	useEffect(() => {
		if (companyDataMap && letterType) {
			fetchReceieveData();
			fetchSendData();
		}
	}, [companyDataMap, letterType]);

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
