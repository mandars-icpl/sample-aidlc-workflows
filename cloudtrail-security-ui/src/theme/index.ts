import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary.main,
      dark: colors.primary.dark,
      light: colors.primary.light,
    },
    secondary: {
      main: colors.purple.main,
      dark: colors.purple.dark,
      light: colors.purple.light,
    },
    background: {
      default: colors.navy.dark,
      paper: colors.navy.main,
    },
    error: {
      main: colors.severity.critical,
    },
    warning: {
      main: colors.severity.high,
    },
    info: {
      main: colors.severity.info,
    },
    success: {
      main: colors.severity.low,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
