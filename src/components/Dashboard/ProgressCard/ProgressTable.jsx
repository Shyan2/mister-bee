import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import { format } from 'd3';

export const ProgressTable = ({ data }) => {
	if (!data) {
		return <pre>Loading...</pre>;
	}
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 200 }}>
				<TableHead>
					<TableRow sx={{ border: 1, borderColor: 'white' }}>
						<TableCell
							sx={{ border: 1, borderColor: 'white' }}
							variant="head"
							style={{ backgroundColor: '#f9423a', color: 'white' }}
						></TableCell>
						<TableCell
							sx={{ border: 1, borderColor: 'white' }}
							variant="head"
							style={{ backgroundColor: '#f9423a', color: 'white' }}
							align="center"
						>
							<Typography variant="h3" fontWeight="bold">
								預定
							</Typography>
							<Typography variant="h3" fontWeight="bold">
								進度
							</Typography>
						</TableCell>
						<TableCell
							sx={{ border: 1, borderColor: 'white' }}
							style={{ backgroundColor: '#f9423a', color: 'white' }}
							align="center"
						>
							<Typography variant="h3" fontWeight="bold">
								實際
							</Typography>
							<Typography variant="h3" fontWeight="bold">
								進度
							</Typography>
						</TableCell>
						<TableCell
							sx={{ border: 1, borderColor: 'white' }}
							style={{ backgroundColor: '#f9423a', color: 'white' }}
							align="center"
						>
							<Typography variant="h3" fontWeight="bold">
								差異
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row, index) => {
						return (
							<TableRow
								sx={{ border: 1, borderColor: 'white' }}
								style={index % 2 ? { backgroundColor: '#efecea' } : { backgroundColor: '#d9d9d6' }}
								key={row.item}
							>
								<TableCell sx={{ border: 1, borderColor: 'white' }} component="th" scope="row">
									<Typography fontWeight="bold">{row.item}</Typography>
								</TableCell>
								<TableCell sx={{ border: 1, borderColor: 'white' }} align="center">
									{format('.3%')(row.plannedProgress / 100)}
								</TableCell>
								<TableCell sx={{ border: 1, borderColor: 'white' }} align="center">
									{format('.3%')(row.realProgress / 100)}
								</TableCell>
								<TableCell sx={{ border: 1, borderColor: 'white' }} align="center">
									<Typography fontWeight="bold" color={row.realProgress - row.plannedProgress > 0 ? 'green' : 'red'}>
										{format('.3%')((row.realProgress - row.plannedProgress) / 100)}
									</Typography>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
