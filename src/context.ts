import { createContext } from "react";

type ThemeContextType = {
  toggleTheme: () => void;
  mode: "light" | "dark";
};

export const ColorModeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: "light",
});