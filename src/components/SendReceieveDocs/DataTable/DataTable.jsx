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
			field: 'SUBJECT',
			headerName: '主旨',
			flex: 1,
			minWidth: 200,
			headerClassName: 'header-theme',
			// hide: true,
		},
		{
			field: 'DELIVER_NO',
			headerName: '來文文號',
			width: 300,
			headerClassName: 'header-theme',
			// hide: true,
		},
		// { field: 'id', headerName: 'ID', width: 90 },

		{
			field: 'DELIVER_UNIT',
			headerName: '來文單位',
			flex: 1,
			sortable: true,
			headerClassName: 'header-theme',
		},
		{
			field: 'DELIVER_LETTER_TYPE',
			headerName: '公文類型',
			width: 150,
			headerClassName: 'header-theme',
		},

		{
			field: 'RECEIVE_DATE',
			headerName: '來文日期',
			width: 150,
			headerClassName: 'header-theme',
			valueFormatter: (params) => moment(params.value).format('YYYY/MM/DD'),
		},
	]);

	const [searchText, setSearchText] = useState('');
	const [rows, setRows] = useState(data);

	const [sortModel, setSortModel] = useState([
		{
			field: 'lastUpdated',
			sort: 'asc',
		},
	]);

	const searchFilter = ({ name, version, filePath, fileSize, lastUpdated }) => ({
		name,
		version,
		filePath,
		lastUpdated,
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
			style={{ height: '80vh', width: '100%' }}
			sx={{
				'& .header-theme': {
					backgroundColor: '#f7f9fa',
					fontWeight: 'bold',
					fontSize: '12',
				},
			}}
		>
			<DataGrid
				getRowId={(row) => row.RECEIVER_NO}
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
