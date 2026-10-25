import { createTheme } from "@mui/material";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
            mode,
            background: {
                default: mode === 'light' ? 'rgb(250,250,250)' : '#121212',
            }
        },
        components: {
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: '2rem',
                    }
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '0.75rem',
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem'
                    }
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '0.75rem',
                        textTransform: 'none',
                    }
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        marginTop: '0.25rem',
                        borderRadius: '0.75rem',
                    }
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: '0.75rem',
                    }
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        borderRadius: '0.75rem',                    }
                },
            },

        },
        typography: {
            fontFamily: '"Inter", sans-serif',
        },
  });