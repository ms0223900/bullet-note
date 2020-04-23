import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { BulletTagItemProps } from '../types';
import useTagStyles from 'BulletNote/styles/stylesObj/useTagStyles';

const BulletTagItem = (props: BulletTagItemProps) => {
  const classes = useTagStyles();
  return (
    <Box className={classes.root} paddingLeft={0.5} paddingRight={0.5}>
      {props.tagName}
    </Box>
  );
};

export default BulletTagItem;