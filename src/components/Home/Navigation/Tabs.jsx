import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Main from '../Main/Main';
import Models from '../Models/Models';
import Markups from '../Markups/Markups';
import Documents from '../Documents/Documents';
import Insights from '../Insights/Insights';

const Tabs = () => {
	const [value, setValue] = React.useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="Tabs">
						<Tab label="Main" value="1" />
						<Tab label="Models" value="2" />
						<Tab label="Markups" value="3" />
						<Tab label="Documents" value="4" />
						<Tab label="Insights" value="5" />
					</TabList>
				</Box>
				<TabPanel value="1">
					<Main />
				</TabPanel>
				<TabPanel value="2">
					<Box>
						<Models />
					</Box>
				</TabPanel>
				<TabPanel value="3">
					<Markups />
				</TabPanel>
				<TabPanel value="4">
					<Documents />
				</TabPanel>
				<TabPanel value="5">
					<Insights />
				</TabPanel>
			</TabContext>
		</Box>
	);
};
export default Tabs;
