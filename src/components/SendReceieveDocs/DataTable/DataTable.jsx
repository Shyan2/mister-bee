import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import {
	DataGrid,
	GridOverlay,
	GridToolbarFilterButton,
	GridToolbarDensitySelector,
	GridToolbarColumnsButton,
	zhCN,
} from '@mui/x-data-grid';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import CompareIcon from '@mui/icons-material/Compare';

import { localizedTextsMap } from '../../../localizedTextMap';
import PreviewIcon from '@mui/icons-material/Preview';
import LinearProgress from '@mui/material/LinearProgress';

import moment from 'moment';

function CustomLoadingOverlay() {
	return (
		<GridOverlay>
			<div style={{ position: 'absolute', top: 0, width: '100%' }}>
				<LinearProgress />
			</div>
		</GridOverlay>
	);
}

function escapeRegExp(value) {
	return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
	return (
		<Box
			sx={{
				p: 0.5,
				pb: 0,
				justifyContent: 'space-between',
				display: 'flex',
				alignItems: 'center',
				flexWrap: 'wrap',
				// backgroundColor: '#f7f9fa',
				padding: '15px',
				marginBottom: '15px',
			}}
		>
			<TextField
				autoComplete="off"
				variant="standard"
				size="small"
				value={props.value}
				onChange={props.onChange}
				placeholder="搜尋…"
				inputProps={{
					id: 'search-textField-input',
					border: '1px solid #e2e2e1',
				}}
				InputProps={{
					border: '1px solid #e2e2e1',
					startAdornment: <SearchIcon fontSize="small" />,
					endAdornment: (
						<IconButton
							title="Clear"
							aria-label="Clear"
							size="small"
							style={{ visibility: props.value ? 'visible' : 'hidden' }}
							onClick={props.clearSearch}
						>
							<ClearIcon fontSize="small" />
						</IconButton>
					),
				}}
				sx={{
					width: {
						xs: 1,
						sm: 'auto',
					},
					m: (theme) => theme.spacing(0.2, 0.2, 0.2),
					'& .MuiSvgIcon-root': {
						mr: 0.5,
					},
					'& .MuiInput-underline:before': {
						borderBottom: 1,
						borderColor: 'divider',
					},
				}}
			/>
			<div>
				{/* <GridToolbarExport /> */}
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
			</div>
		</Box>
	);
}

const DataTable = ({ data }) => {
	// console.log(data);
	const [columns] = useState([
		{
			field: 'docType',
			headerName: '類型',
			width: 60,
			headerClassName: 'header-theme',
			// hide: true,
		},
		{
			field: 'id',
			headerName: '文號',
			flex: 1,
			headerClassName: 'header-theme',
			// hide: true,
		},
		// { field: 'id', headerName: 'ID', width: 90 },

		{
			field: 'sender',
			headerName: '發文單位',
			flex: 1,
			sortable: true,
			headerClassName: 'header-theme',
		},
		{
			field: 'receiver',
			headerName: '收文單位',
			flex: 1,
			sortable: true,
			headerClassName: 'header-theme',
		},

		{
			field: 'DELIVER_LETTER_TYPE',
			headerName: '類型',
			width: 80,
			headerClassName: 'header-theme',
		},

		{
			field: 'RECEIVE_DATE',
			headerName: '日期',
			width: 100,
			headerClassName: 'header-theme',
			valueFormatter: (params) => moment(params.value).format('YYYY/MM/DD'),
		},
		// {
		// 	field: 'view',
		// 	headerName: '預覽',
		// 	width: 100,
		// 	headerClassName: 'header-theme',
		// 	sortable: false,
		// 	renderCell: (params) => {
		// 		return (
		// 			<div>
		// 				<IconButton
		// 					variant="contained"
		// 					size="small"
		// 					style={{ marginLeft: 16 }}
		// 					onClick={() => {
		// 						console.log(params.row);
		// 					}}
		// 				>
		// 					{/* 預覽 */}
		// 					<PreviewIcon color="primary" />
		// 				</IconButton>
		// 			</div>
		// 		);
		// 	},
		// },
	]);

	const [searchText, setSearchText] = useState('');
	const [rows, setRows] = useState(data);

	const [sortModel, setSortModel] = useState([
		{
			field: 'lastUpdated',
			sort: 'asc',
		},
	]);

	const searchFilter = ({ docType, id, DELIVER_LETTER_TYPE, SUBJECT }) => ({
		docType,
		id,
		DELIVER_LETTER_TYPE,
		SUBJECT,
	});
	const requestSearch = (searchValue) => {
		setSearchText(searchValue);
		const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
		const filteredRows = data.filter((row) => {
			return Object.keys(searchFilter(row)).some((field) => {
				return searchRegex.test(row[field].toString());
			});
		});
		setRows(filteredRows);
	};

	useEffect(() => {
		setRows(data);
	}, [data]);

	return (
		<Box
			style={{ height: '75vh', width: '100%' }}
			sx={{
				'& .header-theme': {
					backgroundColor: '#f7f9fa',
					fontWeight: 'bold',
					fontSize: '12',
				},
			}}
		>
			<DataGrid
				getRowId={(row) => row.id}
				aria-label="File Data Grid"
				localeText={localizedTextsMap}
				// localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
				rows={rows}
				columns={columns}
				autoPageSize
				disableSelectionOnClick
				sortModel={sortModel}
				components={{ Toolbar: QuickSearchToolbar, LoadingOverlay: CustomLoadingOverlay }}
				componentsProps={{
					toolbar: {
						value: searchText,
						onChange: (event) => requestSearch(event.target.value),
						clearSearch: () => requestSearch(''),
					},
				}}
			/>
		</Box>
	);
};

export default DataTable;
