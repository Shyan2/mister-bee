import { colors } from '@mui/material';
import shadows from './shadows';
import typography from './typography';
import { ThemeProvider, createTheme, makeStyles } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		background: {
			dark: '#F4F6F8',
			default: colors.common.white,
			// default: 'transparent',
			paper: colors.common.white,
		},
		primary: {
			main: colors.indigo[500],
		},
		secondary: {
			main: colors.red[400],
		},
		text: {
			primary: colors.blueGrey[900],
			secondary: colors.blueGrey[600],
		},
	},
	shadows,
	typography,
});

export default theme;
