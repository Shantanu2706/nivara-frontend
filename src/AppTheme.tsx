import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

interface AppThemeProps {
    children: React.ReactNode
}

const AppTheme = (props: AppThemeProps) => {
    const { children } = props;

    const theme = createTheme({
        components: {
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: '2rem',
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
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}

export default AppTheme;