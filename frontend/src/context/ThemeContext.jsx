// frontend/src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  theme: "storefront",
  setTheme: () => {},
  toggleTheme: () => {},
  isStorefront: true,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("qr_theme_view");
      return saved === "classic" ? "classic" : "storefront";
    } catch {
      return "storefront";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("qr_theme_view", theme);
    } catch (err) {
      console.warn("Could not save theme preference:", err);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "storefront" ? "classic" : "storefront"));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isStorefront: theme === "storefront",
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;
