import React from 'react';
import { Box, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';
import { TagWholePageDateTagToggleProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  }
}));

const TagWholePageDateTagToggle = (props: TagWholePageDateTagToggleProps) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.root} 
      label={'顯示日期分隔線'}
      control={
        <Checkbox 
          {...props}
          color={'primary'}
        />
      }
    />
  );
};

export default TagWholePageDateTagToggle;