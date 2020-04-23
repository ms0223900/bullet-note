import React from 'react';
import logo from './logo.svg';
import './App.css';
import BulletNote from 'BulletNote';
import { ThemeProvider } from '@material-ui/core';
import theme from 'BulletNote/theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BulletNote />
    </ThemeProvider>
  );
}

export default App;
