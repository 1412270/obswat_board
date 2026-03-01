import { createTheme } from '@mui/material'

export const dashboardTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#0066cc',
            light: '#0073e6',
            dark: '#0052a3',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#00a8e8',
            light: '#1ab8f8',
            dark: '#0088c8',
            contrastText: '#ffffff',
        },
        background: {
            default: '#0a1929',
            paper: '#1a2332',
        },
        text: {
            primary: '#e8eaed',
            secondary: '#9aa0a6',
        },
        divider: '#2d3748',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 600,
            color: '#e8eaed',
        },
        h2: {
            fontWeight: 600,
            color: '#e8eaed',
        },
        h3: {
            fontWeight: 600,
            color: '#e8eaed',
        },
        h4: {
            fontWeight: 600,
            color: '#e8eaed',
        },
        h5: {
            fontWeight: 600,
            color: '#e8eaed',
        },
        h6: {
            fontWeight: 600,
            color: '#e8eaed',
        },
        body1: {
            color: '#e8eaed',
        },
        body2: {
            color: '#9aa0a6',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: '#0066cc',
                    color: '#ffffff',
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#0073e6',
                    },
                },
                outlined: {
                    borderColor: '#0066cc',
                    color: '#0066cc',
                    '&:hover': {
                        borderColor: '#0073e6',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1a2332',
                    border: '1px solid #2d3748',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0f172a',
                    borderBottom: '1px solid #2d3748',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1a2332',
                    border: '1px solid #2d3748',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#0a1929',
                        '& fieldset': {
                            borderColor: '#2d3748',
                        },
                        '&:hover fieldset': {
                            borderColor: '#0066cc',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#0066cc',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#9aa0a6',
                    },
                    '& .MuiInputBase-input': {
                        color: '#e8eaed',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0a1929',
                    color: '#e8eaed',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2d3748',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0066cc',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0066cc',
                    },
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: '#0066cc',
                },
                thumb: {
                    '&:hover': {
                        boxShadow: '0 0 0 8px rgba(0, 102, 204, 0.16)',
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: '#9aa0a6',
                    '&.Mui-checked': {
                        color: '#0066cc',
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#9aa0a6',
                    '&.Mui-checked': {
                        color: '#0066cc',
                    },
                },
            },
        },
    },
})

