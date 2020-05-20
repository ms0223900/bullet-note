import React from 'react';
import logo from './logo.svg';
import './App.css';
import BulletNote from 'BulletNote';
import { ThemeProvider } from '@material-ui/core';
import theme from 'BulletNote/theme/theme';
import ContextWrapper from 'BulletNote/constants/context';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContextWrapper customInitState={{
      // messageList: initMessageList,
      }}>
        <BulletNote />
      </ContextWrapper>
    </ThemeProvider>
  );
}

export default App;
