/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        if (isDarkMode) {
            localStorage.setItem("theme", "dark");
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.setAttribute("data-theme", "emerald");
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};
