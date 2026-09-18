import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { BOARD_THEMES, BoardTheme, DEFAULT_BOARD_THEME } from '../theme/boardThemes';

const THEME_STORAGE_KEY = '@chessmaster/boardTheme';

interface ThemeContextValue {
  theme: BoardTheme;
  themes: BoardTheme[];
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function BoardThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState(DEFAULT_BOARD_THEME.id);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (stored && BOARD_THEMES.some((candidate) => candidate.id === stored)) {
        setThemeIdState(stored);
      }
    });
  }, []);

  const setThemeId = (id: string) => {
    setThemeIdState(id);
    AsyncStorage.setItem(THEME_STORAGE_KEY, id).catch(() => {});
  };

  const theme = BOARD_THEMES.find((candidate) => candidate.id === themeId) ?? DEFAULT_BOARD_THEME;

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, themes: BOARD_THEMES, setThemeId }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useBoardTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useBoardTheme must be used within a BoardThemeProvider');
  }
  return ctx;
}
