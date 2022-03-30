import { useState, useEffect, useContext } from 'react';
// import { SelectedObjectContext } from './Context';
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

import { localizedTextsMap } from '../../localizedTextMap';
import PreviewIcon from '@mui/icons-material/Preview';
import LinearProgress from '@mui/material/LinearProgress';
import { ContentCutOutlined, ThreeDRotation } from '@mui/icons-material';

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

const PropertiesTable = ({ items, isLoading }) => {
	console.log(items);
	// const { selectedObject, setSelectedObject } = useContext(SelectedObjectContext);

	const [columns] = useState([
		{
			field: 'svf2Id',
			headerName: 'ID',
			width: 100,
			headerClassName: 'header-theme',
		},
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			headerClassName: 'header-theme',
		},
		{
			field: 'category',
			headerName: 'Category',
			flex: 1,
			headerClassName: 'header-theme',
		},

		{
			field: 'materialOne',
			headerName: '類別',
			flex: 1,
			headerClassName: 'header-theme',
		},
		{
			field: 'materialThree',
			headerName: 'Material',
			flex: 1,
			headerClassName: 'header-theme',
			hide: true,
		},
		{
			field: 'revitCategory',
			headerName: 'Revit Category',
			flex: 1,
			headerClassName: 'header-theme',
			hide: true,
		},
		{
			field: 'revitFamily',
			headerName: 'Revit Family',
			flex: 1,
			headerClassName: 'header-theme',
		},
		{
			field: 'view',
			headerName: '預覽',
			width: 100,
			headerClassName: 'header-theme',
			sortable: false,
			renderCell: (params) => {
				return (
					<div>
						<IconButton
							variant="contained"
							size="small"
							style={{ marginLeft: 16 }}
							onClick={() => {
								console.log(params);
								window.NOP_VIEWER.isolate(params.id);
								window.NOP_VIEWER.select(params.id);

								// window.NOP_VIEWER.navigation.FIT_TO_VIEW_VERTICAL_OFFSET = 0.2;
								// window.NOP_VIEWER.navigation.FIT_TO_VIEW_HORIZONTAL_MARGIN = 0.2;
								window.NOP_VIEWER.fitToView(params.id);
							}}
						>
							{/* 預覽 */}
							<PreviewIcon color="primary" />
						</IconButton>
					</div>
				);
			},
		},
	]);

	const [searchText, setSearchText] = useState('');
	const [rows, setRows] = useState(items);

	const [sortModel, setSortModel] = useState([
		{
			field: 'lastUpdated',
			sort: 'asc',
		},
	]);
	const searchFilter = ({ name, category, revitCategory, revitFamily }) => ({
		name,
		category,
		revitCategory,
		revitFamily,
	});
	const requestSearch = (searchValue) => {
		setSearchText(searchValue);
		const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
		const filteredRows = items.filter((row) => {
			return Object.keys(searchFilter(row)).some((field) => {
				return searchRegex.test(row[field].toString());
			});
		});
		setRows(filteredRows);
	};

	useEffect(() => {
		setRows(items);
	}, [items]);

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
				getRowId={(row) => row.svf2Id}
				aria-label="File Data Grid"
				localeText={localizedTextsMap}
				// localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
				rows={rows}
				columns={columns}
				autoPageSize
				disableSelectionOnClick
				loading={isLoading}
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

export default PropertiesTable;
