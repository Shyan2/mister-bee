import { useState, useEffect, useContext } from 'react';
import { SelectedObjectContext } from '../Context';
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
import PreviewIcon from '@mui/icons-material/Preview';
import LinearProgress from '@mui/material/LinearProgress';

import { localizedTextsMap } from '../../../localizedTextMap';

function CustomLoadingOverlay() {
	return (
		<GridOverlay>
			<div style={{ position: 'absolute', top: 0, width: '100%' }}>
				<LinearProgress />
			</div>
		</GridOverlay>
	);
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

const MarkupsTable = ({ items, isLoading }) => {
	const { selectedObject, setSelectedObject } = useContext(SelectedObjectContext);
	const columns = [
		// { field: 'id', headerName: 'ID', width: 70, headerClassName: 'header-theme' },
		{
			field: 'thumbnail',
			headerName: 'Thumbnail',
			description: 'This column is not sortable.',
			sortable: false,
			flex: 1,
		},
		{ field: 'status', headerName: 'Status', width: 130, headerClassName: 'header-theme' },
		{ field: 'description', headerName: 'Description', flex: 1, headerClassName: 'header-theme' },

		{
			field: 'creatorName',
			headerName: 'Creator Name',
			description: 'This column is not sortable.',
			sortable: false,
			flex: 1,
		},
		{
			field: 'project',
			headerName: 'Project ID',
			width: 90,
		},
		{
			field: 'view',
			headerName: 'View',
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
								console.log('clicked view!');
								console.log(params.row);
								setSelectedObject({
									id: params.row.id,
									svgString: params.row.svgString,
									urn: params.row.viewerState.seedURN,
									viewerState: params.row.viewerState,
									markupView: true,
								});
							}}
						>
							<PreviewIcon color="primary" />
						</IconButton>
					</div>
				);
			},
		},
	];

	const [rows, setRows] = useState(items);
	useEffect(() => {
		setRows(items);
		console.log(items);
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
				aria-label="Markups Data Grid"
				localeText={localizedTextsMap}
				rows={rows}
				columns={columns}
				autoPageSize
				disableSelectionOnClick
				loading={isLoading}
				components={{ Toolbar: QuickSearchToolbar, LoadingOverlay: CustomLoadingOverlay }}
			/>
		</Box>
	);
};

export default MarkupsTable;
