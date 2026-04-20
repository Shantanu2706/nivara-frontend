import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, useColorScheme } from "@mui/material";
import { getTheme } from "./theme";
import { useMemo, useState } from "react";
import { ColorModeContext } from "./context";

interface AppThemeProps {
    children: React.ReactNode
}

const AppTheme = (props: AppThemeProps) => {
    const { children } = props;
    const [mode, setMode] = useState<'light' | 'dark'>((localStorage.getItem("theme") as "light" | "dark") || "light");
    const theme = useMemo(() => getTheme(mode), [mode]);
    
    const toggleTheme = () => {
        setMode((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", next);
            return next;
        });
    }

    return (
        <ColorModeContext.Provider value={{toggleTheme,mode}}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
        </ColorModeContext.Provider>
        
    )
}

export default AppTheme;