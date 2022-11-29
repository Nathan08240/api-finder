import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#357a38',
            main: '#4caf50',
            dark: '#6fbf73',
            contrastText: '#fff',
        },
        secondary: {
            light: '#1c54b2',
            main: '#2979ff',
            dark: '#5393ff',
            contrastText: '#000',
        },
    },
});