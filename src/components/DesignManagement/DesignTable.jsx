import { useState, useEffect, useContext } from 'react';
import { ModelPropertiesContext, SelectedObjectContext } from './Context';
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
import BarChartIcon from '@mui/icons-material/BarChart';

import { localizedTextsMap } from '../../localizedTextMap';
import PreviewIcon from '@mui/icons-material/Preview';
import LinearProgress from '@mui/material/LinearProgress';

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
				p: 0,
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

const DesignTable = ({ items, isLoading }) => {
	const { selectedObject, setSelectedObject } = useContext(SelectedObjectContext);
	const { selectedModelProps, setSelectedModelProps } = useContext(ModelPropertiesContext);

	const [columns] = useState([
		{
			field: 'name',
			headerName: '資料名稱',
			flex: 1,
			headerClassName: 'header-theme',
		},
		// { field: 'id', headerName: 'ID', width: 90 },

		{
			field: 'version',
			headerName: '版次',
			minWidth: 100,
			sortable: false,
			headerClassName: 'header-theme',
		},
		{
			field: 'filePath',
			headerName: '類別',
			flex: 1,
			headerClassName: 'header-theme',
		},
		{
			field: 'fileSize',
			headerName: '大小',
			width: 150,
			headerClassName: 'header-theme',
			// hide: true,
		},
		{
			field: 'lastUpdated',
			headerName: '最後更新',
			width: 150,
			headerClassName: 'header-theme',
			// hide: true,
		},
		{
			field: 'view',
			headerName: '預覽',
			width: 200,
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
								setSelectedObject({
									id: params.id,
									name: params.row.name,
									urn: params.row.urn,
									simpleView: true,
								});
							}}
						>
							{/* 預覽 */}
							<PreviewIcon color="primary" />
						</IconButton>
						{params.row.indexState === 'FINISHED' && (
							<IconButton
								variant="contained"
								size="small"
								style={{ marginLeft: 16 }}
								onClick={() => {
									console.log(params.row);
									setSelectedModelProps({
										indexId: params.row.indexId,
										queryId: params.row.queryId,
										urn: params.row.urn,
										versionName: params.row.name + ' ' + params.row.version,
									});
								}}
							>
								<BarChartIcon color="primary" />
							</IconButton>
						)}
						{/* check if dwg or pdf has versions to compare */}
						{parseInt(params.row.version.substring(params.row.version.indexOf('V') + 1)) > 1 &&
							(params.row.name.substring(params.row.name.length - 4) === '.dwg' ||
								params.row.name.substring(params.row.name.length - 4) === '.pdf') && (
								<IconButton
									variant="contained"
									size="small"
									style={{ marginLeft: 16 }}
									onClick={() => {
										setSelectedObject({
											id: params.id,
											name: params.row.name,
											urn: params.row.urn,
											versionPath: params.row.versionPath,
											version: params.row.version,
											// ...params.row,
											compareView: true,
										});
									}}
								>
									<CompareIcon color="primary" />
								</IconButton>
							)}
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
	const searchFilter = ({ name, version, filePath, fileSize, lastUpdated }) => ({
		name,
		version,
		filePath,
		lastUpdated,
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
			style={{ height: '97%', width: '100%' }}
			sx={{
				'& .header-theme': {
					backgroundColor: '#f7f9fa',
					fontWeight: 'bold',
					fontSize: '12',
				},
			}}
		>
			<DataGrid
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

export default DesignTable;
