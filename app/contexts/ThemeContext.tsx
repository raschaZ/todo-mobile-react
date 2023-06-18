import React, { createContext, useState, useEffect } from 'react';
import { getItem, setItem } from '../../utils/functions';

export type Theme = 'light' | 'dark';

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextData>({
  theme: 'light',
  toggleTheme: () => {},
});

const ThemeProvider: React.FC = ({ children }: any) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    getItem('theme')
      .then((storedTheme: any) => {
        if (storedTheme) {
          setTheme(storedTheme as Theme);
        }
      })
      .catch((error: Error) => {
        console.error('Error retrieving theme from storage:', error);
      });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setItem('theme', newTheme).catch((error: Error) => {
      console.error('Error storing theme in storage:', error);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
