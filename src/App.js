import { useState, useMemo } from 'react';
import GlobalStyles from './theme/GlobalStyles';
import { Box, Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './Context';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

import Navbar from './components/Navigation/Navbar';
import Home from './components/Home/Home';
import DesignManagement from './components/DesignManagement/DesignManagement';
import KnowledgeBase from './components/KnowledgeBase/KnowledgeBase';
import BIM360Tree from './components/BIM360Tree';
import Dashboard from './components/Dashboard/Dashboard';
import ModelProperties from './components/ModelProperties/ModelProperties';
import NotLoggedIn from './components/Error/NotLoggedIn';
import SendReceiveDocs from './components/SendReceieveDocs/SendReceieveDocs';

import './App.css';
const App = () => {
	const [user, setUser] = useState({});
	const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Box sx={{ pt: '48px', pl: '64px' }}>
				<BrowserRouter>
					<UserContext.Provider value={userValue}>
						<Navbar />
						<Routes>
							{user.firstName && (
								<>
									<Route path="/designManagement" element={<DesignManagement />} />
									<Route path="/knowledgeBase" element={<KnowledgeBase />} />
									<Route path="/bim360tree" element={<BIM360Tree />} />
									<Route path="/dashboard" element={<Dashboard />} />
									<Route path="/modelproperties" element={<ModelProperties />} />
									<Route path="/sendReceiveDocs" element={<SendReceiveDocs />} />
								</>
							)}
							<Route path="/" element={<Home />} />
							<Route path="*" element={<NotLoggedIn />} />
						</Routes>
					</UserContext.Provider>
				</BrowserRouter>
			</Box>
		</ThemeProvider>
	);
};

export default App;
