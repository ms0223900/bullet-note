import React from 'react';
import { Box, makeStyles, TextareaAutosize } from '@material-ui/core';
import { InputProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxHeight: 200,
    borderWidth: 2,
    outline: 0,
    fontSize: 16,
    padding: theme.spacing(),
    paddingTop: theme.spacing() * 1.5,
    paddingBottom: theme.spacing() * 1.5,
    borderRadius: theme.spacing() * 0.5,
    resize: 'none',
    overflow: 'scroll',
    backgroundColor: `rgba(255, 255, 255, ${0.75})`,
    transition: '0.1s',
    '&:focus': {
      borderColor: theme.palette.primary.main,
      transition: '0.1s',
    }
  }
}));

const CustomTextArea = (props: InputProps) => {
  const {
    value,
    onChange,
  } = props;
  
  const classes = useStyles();

  return (
    <TextareaAutosize 
      style={{
        overflow: 'scroll',
        overflowX: 'hidden',
      }}
      className={classes.root}
      autoFocus={true}
      value={value}
      onChangeCapture={onChange as any}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
    />
  );
};

export default CustomTextArea;