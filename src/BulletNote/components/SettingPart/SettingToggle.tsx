import React from 'react';
import { Box, makeStyles, FormControlLabel, Checkbox, Divider } from '@material-ui/core';
import { SettingToggleProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  }
}));

const SettingToggle = (props: SettingToggleProps) => {
  const classes = useStyles();

  return (
    <>
      <FormControlLabel
        className={classes.root} 
        label={props.label}
        control={
          <Checkbox 
            {...props}
            color={'primary'}
          />
        }
      />
      <Divider />
    </>
  );
};

export default SettingToggle;