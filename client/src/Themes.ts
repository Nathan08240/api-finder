import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#ea605d',
            main: '#e53935',
            dark: '#a02725',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffee33',
            main: '#ffea00',
            dark: '#b2a300',
            contrastText: '#000',
        },
    },
});