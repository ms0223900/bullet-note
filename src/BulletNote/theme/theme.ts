import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#d0edf7',
      main: '#89c6f0',
      dark: '#508cb5'
    }
  }
});

export const otherColors = {
  starPart: '#edda8c',
};

export const zIndexes = {
  clickBackground: -1,
  pinMessageList: 10,
  morePart: 11,
  messageButtonsPart: 12,
  navBar: 20,
  moveToButtons: 1000,
};

export default theme;