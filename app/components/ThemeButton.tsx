// ThemeButton.tsx

import React, { useContext } from 'react';
import { Button } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Button
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`}
      onPress={() => toggleTheme()} // Update the onPress event handler
    />
  );
};

export default ThemeButton;
