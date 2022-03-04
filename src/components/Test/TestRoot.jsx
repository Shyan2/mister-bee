import { useState, useContext, useMemo } from 'react';
import { Box, Container, Grid, CircularProgress } from '@mui/material';
import TestTree from './TestTree';
import FileInfoTable from '../BIM360Tree/FileInfoTable';

import { UserContext } from '../../Context';
import { SelectedItemContext, ViewingItemContext } from '../BIM360Tree/Context';
import Viewer from './Viewer';

const TestRoot = () => {
	const { user } = useContext(UserContext);

	const [selectedItem, setSelectedItem] = useState({});
	const [viewingItem, setViewingItem] = useState({});

	const selectedItemValue = useMemo(() => ({ selectedItem, setSelectedItem }), [selectedItem, setSelectedItem]);
	const viewingItemValue = useMemo(() => ({ viewingItem, setViewingItem }), [viewingItem, setViewingItem]);

	return (
		<SelectedItemContext.Provider value={selectedItemValue}>
			<ViewingItemContext.Provider value={viewingItemValue}>
				{viewingItem.id && <Viewer />}
				<Box
					style={{
						display: !viewingItem.id ? 'flex' : 'none',
					}}
				>
					<Container disableGutters sx={{ p: 2, m: 0 }} maxWidth>
						<Grid container spacing={2}>
							<Grid item xs={4}>
								<Box sx={{ overflow: 'auto', maxHeight: '90vh' }}>
									{user.firstName ? (
										<TestTree id={'#'} name={user.firstName + ' ' + user.lastName} />
									) : (
										<CircularProgress />
									)}
								</Box>
							</Grid>
							<Grid item xs={8}>
								<Box sx={{}}>
									<FileInfoTable />
								</Box>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</ViewingItemContext.Provider>
		</SelectedItemContext.Provider>
	);
};

export default TestRoot;
