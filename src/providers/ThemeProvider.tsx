"use client"

import { createContext, useContext, useState, type ReactNode } from 'react';

export const THEME_OPTIONS: { [key: string]: { backgroundColor: string, textColor: string, currentFileColor: string, collinOsColor: string, fontSize: string } } = {
  light: {
    backgroundColor: 'white',
    textColor: 'black',
    currentFileColor: 'blue',
    collinOsColor: 'green',
    fontSize: '0.85rem',
  },
  dark: {
    backgroundColor: 'black',
    textColor: 'white',
    currentFileColor: 'lightblue',
    collinOsColor: 'red',
    fontSize: '0.85rem',
  },
  solarized: {
    backgroundColor: '#002b36',
    textColor: '#839496',
    currentFileColor: '#268bd2',
    collinOsColor: '#dc322f',
    fontSize: '0.85rem',
  },
  ocean: {
    backgroundColor: '#1B2B34',
    textColor: '#D8DEE9',
    currentFileColor: '#5FB3B3',
    collinOsColor: '#EC5f67',
    fontSize: '0.85rem',
  },
  forest: {
    backgroundColor: '#2E3C2F',
    textColor: '#A7C080',
    currentFileColor: '#83A598',
    collinOsColor: '#E67E80',
    fontSize: '0.85rem',
  },
  desert: {
    backgroundColor: '#EDC9AF',
    textColor: '#3B3A36',
    currentFileColor: '#D27B53',
    collinOsColor: '#C16069',
    fontSize: '0.85rem',
  },
  twilight: {
    backgroundColor: '#282A36',
    textColor: '#F8F8F2',
    currentFileColor: '#6272A4',
    collinOsColor: '#FF79C6',
    fontSize: '0.85rem',
  },
  sunrise: {
    backgroundColor: '#FFFAF0',
    textColor: '#FF4500',
    currentFileColor: '#FFD700',
    collinOsColor: '#FF6347',
    fontSize: '0.85rem',
  }
}

export const VALID_THEME_NAMES = Object.keys(THEME_OPTIONS) as ThemeName[];
export type ThemeName = keyof typeof THEME_OPTIONS | 'custom';

const ThemeContext = createContext({
  backgroundColor: 'black',
  textColor: 'white',
  currentFileColor: 'lightblue',
  collinOsColor: 'red',
  fontSize: '1rem',
  setBackgroundColor: (color: string) => {},
  setTextColor: (color: string) => {},
  setCurrentFileColor: (color: string) => {},
  setCollinOsColor: (color: string) => {},
  setFontSize: (size: string) => {},
  flashBackgroundColor: () => {},
  setTheme: (themeName: ThemeName) => {},
  currentTheme: 'dark',
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [currentFileColor, setCurrentFileColor] = useState('lightblue');
  const [collinOsColor, setCollinOsColor] = useState('red');
  const [fontSize, setFontSize] = useState('0.85rem');
  const [isFlashing, setIsFlashing] = useState(false);
  const [textColor, setTextColor] = useState('white');

  const flashBackgroundColor = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 100);
  }

  const setTheme = (themeName: ThemeName) => {
    const theme = THEME_OPTIONS[themeName];
    if (theme) {
      setBackgroundColor(theme.backgroundColor);
      setTextColor(theme.textColor);
      setCurrentFileColor(theme.currentFileColor);
      setCollinOsColor(theme.collinOsColor);
      setFontSize(theme.fontSize);
    }
  }

  const currentTheme = Object.keys(THEME_OPTIONS).find((themeName) => {
    const theme = THEME_OPTIONS[themeName];
    return (
      backgroundColor === theme.backgroundColor &&
      textColor === theme.textColor &&
      currentFileColor === theme.currentFileColor &&
      collinOsColor === theme.collinOsColor &&
      fontSize === theme.fontSize
    );
  }) || 'custom';

  return (
    <ThemeContext.Provider value={{ 
      backgroundColor: isFlashing ? 'grey' : backgroundColor,
      currentFileColor,
      collinOsColor,
      fontSize,
      textColor,
      setBackgroundColor,
      setCurrentFileColor,
      setCollinOsColor,
      setFontSize,
      setTextColor,
      flashBackgroundColor,
      setTheme,
      currentTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
