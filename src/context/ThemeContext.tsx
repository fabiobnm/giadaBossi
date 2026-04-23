// src/app/context/ThemeContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  dark: boolean;
  toggleDark: () => void;
  left: boolean;
  toggleLeft: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggleDark: () => {},
  left: false,
  toggleLeft: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [left, setLeft] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleDark: () => setDark((d) => !d),
        left,
        toggleLeft: () => setLeft((l) => !l),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}