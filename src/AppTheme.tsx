import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, useColorScheme } from "@mui/material";

interface AppThemeProps {
    children: React.ReactNode
}

const AppTheme = (props: AppThemeProps) => {
    const { children } = props;


    const theme = createTheme({
        palette: {
            background: {
                default: 'rgb(250,250,250)',
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
        },
        typography: {
            fontFamily: '"Inter", sans-serif',
        },
    });


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default AppTheme;