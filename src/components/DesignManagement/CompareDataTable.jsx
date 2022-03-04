import { useState, useEffect, useContext } from 'react';
import { SelectedObjectContext } from './Context';
import { Button, MenuItem, InputLabel, FormControl, Select, Typography } from '@mui/material';

import moment from 'moment';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_ROUTE;

const CompareDataTable = ({ compareModelUrn, setCompareModelUrn, projectID }) => {
	const { selectedObject, setSelectedObject } = useContext(SelectedObjectContext);

	const [defaultModelObject, setDefaultModelObject] = useState(null);
	const [compareModelObject, setCompareModelObject] = useState(null);

	const [compareVersion, setCompareVersion] = useState('');
	const [defaultVersion, setDefaultVersion] = useState('');

	useEffect(() => {
		setCompareModelUrn('');
		setDefaultVersion(defaultModelObject?.version);

		const asyncGetObject = async () => {
			const defaultObject = await getObject(selectedObject.versionPath);
			setDefaultVersion(defaultObject.version);
			setDefaultModelObject(defaultObject);
		};
		asyncGetObject();
	}, []);

	const getObject = async (versionID) => {
		const result = await axios.get(`${SERVER_URL}/api/forge/getVersion?projectID=${projectID}&versionID=${versionID}`);

		// console.log(result.data);
		return result.data;
	};

	const handleDefaultChange = (event) => {
		setDefaultVersion(event.target.value);
	};

	const handleCompareChange = async (event) => {
		setCompareVersion(event.target.value);
	};

	useEffect(() => {
		if (compareVersion) {
			const asyncGetCompareModel = async () => {
				const newVersionId =
					selectedObject.versionPath.substring(0, selectedObject.versionPath.indexOf('=')) + '=' + compareVersion;
				// console.log(newVersionId);
				const returnObject = await getObject(newVersionId);
				setCompareModelObject(returnObject);
				setCompareModelUrn(returnObject.urn);
			};
			asyncGetCompareModel();
		}
	}, [compareVersion]);

	const getVersionList = () => {
		let versionList = [];
		for (let i = 1; i <= defaultModelObject?.version; i++) {
			if (i === defaultModelObject.version) {
				versionList.push(
					<MenuItem value={i} key={i} disabled>
						V{i}
					</MenuItem>,
				);
			} else {
				versionList.push(
					<MenuItem value={i} key={i}>
						V{i}
					</MenuItem>,
				);
			}
		}
		return versionList;
	};

	const fileInfo = (name, lastModifiedUser, lastModifiedTime, fileSize, version) => {
		return (
			<div>
				<div>資料名稱: {name}</div>
				<div>最後修改使用者: {lastModifiedUser}</div>
				<div>最後更新時間: {moment(lastModifiedTime).format('YYYY/MM/DD - HH:mm')}</div>
				<div>大小: {fileSize}</div>
				<div>版次: V{version}</div>
			</div>
		);
	};

	return (
		<>
			<div style={{ width: '100%' }}>
				<Typography variant="h6">資料</Typography>
				{fileInfo(
					defaultModelObject?.name,
					defaultModelObject?.lastModifiedUser,
					defaultModelObject?.lastModifiedTime,
					defaultModelObject?.fileSize,
					defaultModelObject?.version,
				)}
			</div>
			&nbsp; &nbsp;
			<Typography variant="h6"> 比較</Typography>
			<div style={{ width: '100%' }}>
				<FormControl style={{ width: '150px' }}>
					<InputLabel id="compareModelObject-select-label">選擇</InputLabel>
					<Select
						labelId="compareModelObject-select-label"
						value={compareVersion}
						label="Version"
						onChange={handleCompareChange}
					>
						{getVersionList()}
					</Select>
				</FormControl>

				{compareVersion ? (
					<div>
						{fileInfo(
							compareModelObject?.name,
							compareModelObject?.lastModifiedUser,
							compareModelObject?.lastModifiedTime,
							compareModelObject?.fileSize,
							compareModelObject?.version,
						)}
						&nbsp;
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								setCompareVersion('');
								setCompareModelObject(null);
								setCompareModelUrn(null);
							}}
						>
							回復
						</Button>
					</div>
				) : (
					<div>沒有選擇檔案</div>
				)}
			</div>
		</>
	);
};

export default CompareDataTable;
