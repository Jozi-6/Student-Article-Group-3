import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#667eea',
            light: '#8b9bf7',
            dark: '#4a5fc1',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f093fb',
            light: '#f3b4fc',
            dark: '#d873e8',
            contrastText: '#ffffff',
        },
        success: {
            main: '#4facfe',
            light: '#6fb8fe',
            dark: '#2d8bfe',
            contrastText: '#ffffff',
        },
        error: {
            main: '#f5576c',
            light: '#f77984',
            dark: '#d9365a',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ffc107',
            light: '#ffcd38',
            dark: '#c79100',
            contrastText: '#000000',
        },
        info: {
            main: '#17a2b8',
            light: '#42b3d5',
            dark: '#117a8b',
            contrastText: '#ffffff',
        },
        background: {
            default: '#fafafa',
            paper: '#ffffff',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
            disabled: '#rgba(0, 0, 0, 0.38)',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.4,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h5: {
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
        h6: {
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        caption: {
            fontSize: '0.75rem',
            lineHeight: 1.4,
        },
    },
    shape: {
        borderRadius: 8,
    },
    shadows: [
        'none',
        '0px 2px 1px -1px rgba(0,0,0,0.06), 0px 1px 1px 0px rgba(0,0,0,0.04), 0px 1px 3px 0px rgba(0,0,0,0.04)',
        '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px 0px rgba(0,0,0,0.06), 0px 1px 5px 0px rgba(0,0,0,0.04)',
        '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05), 0px 2px 5px -2px rgba(0,0,0,0.04)',
        '0px 20px 25px -5px rgba(0,0,0,0.08), 0px 6px 10px -5px rgba(0,0,0,0.04), 0px 3px 8px -3px rgba(0,0,0,0.03)',
        '0px 25px 50px -12px rgba(0,0,0,0.15), 0px 8px 15px -6px rgba(0,0,0,0.06), 0px 4px 10px -4px rgba(0,0,0,0.04)',
    ],
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 8,
                    padding: '8px 16px',
                },
                contained: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

export default theme;
