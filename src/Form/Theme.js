import { createTheme } from '@mui/material/styles';

// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FDD835&secondary.color=78909C
export const Theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#fdd835',
            darker: '#c6a700',
            lighter: '#ffff6b',
        },
        neutral: {
            main: '#eeeeee',
            contrastText: '#050505',
        },
        secondary: {
            main: '#8fa3ad',
            darker: '#61747e',
            lighter: '#bfd4df'
        }
    },
});