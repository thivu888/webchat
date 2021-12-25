import { createTheme, Theme } from '@mui/material/styles';

export const theme = createTheme({
  breakpoints: {
    values: {
  
        mobile: 0,
        mobileplus: 600,
        tablet: 800,
        desktop: 1280,
        desktopplus: 1380,
    },
  },
  palette: {
    primary: {
      main: '#0091ff',
      light: '#0091ffb3',
      dark: '#006edc',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
    text: {
      primary: '#283754',
      secondary: '#6C778B',
      disabled: '#99A4B9',
    },
    common: {
      white: '#FFFFFF',
      black: '#000000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F8FC',
    },
  },
});