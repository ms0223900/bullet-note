import React from 'react';
import { Box, makeStyles, BoxProps } from '@material-ui/core';
import { zIndexes } from 'BulletNote/theme/theme';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: zIndexes.clickBackground,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // backgroundColor: '#ddd',
  }
}));

const ClickBackground = (props: BoxProps) => {
  const classes = useStyles();
  return (
    <Box 
      {...props}
      className={classes.root}
    />
  );
};

export default ClickBackground;