import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

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
        }
    });


    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default AppTheme;