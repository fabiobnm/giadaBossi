// src/app/context/ThemeContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  dark: boolean;
  setDark: (value: boolean) => void;
  toggleDark: () => void;

  left: boolean;
  setLeft: (value: boolean) => void;
  toggleLeft: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  setDark: () => {},
  toggleDark: () => {},

  left: false,
  setLeft: () => {},
  toggleLeft: () => {},
});
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [left, setLeft] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        setDark,
        toggleDark: () => setDark((d) => !d),

        left,
        setLeft,
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