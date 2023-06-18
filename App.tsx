import React from 'react';
import Toast from 'react-native-toast-message';
import Route from './navigation/Route';
import ThemeButton from './app/components/ThemeButton';
import ThemeProvider from './app/contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Route />
      <ThemeButton />
      <Toast />
    </ThemeProvider>
  );
}
