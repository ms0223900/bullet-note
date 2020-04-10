import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { BulletTagItemProps } from '../types';

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    backgroundColor: '#aff',
    borderRadius: theme.spacing(0.5),
    '&:hover': {
      opacity: 0.8,
    }
  }
}));

const BulletTagItem = (props: BulletTagItemProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} paddingLeft={0.5} paddingRight={0.5}>
      {props.tagName}
    </Box>
  );
};

export default BulletTagItem;