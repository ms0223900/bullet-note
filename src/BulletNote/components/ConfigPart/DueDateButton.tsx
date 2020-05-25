import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { AlarmOutlined } from '@material-ui/icons';
import { DueDateButtonProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  count: {
    width: 16,
    height: 16,
          
    lineHeight: '16px',
    borderRadius: 1000,
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
  }
}));

const DueDateButton = (props: DueDateButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      color={'primary'}
      variant={'outlined'}
      onClick={props.setDueDateModeFn}
    >
      <AlarmOutlined />
      <Box
        display={'inline-block'}
        className={classes.count}
      >
        {props.dueDateMessageListCount}
      </Box>
    </Button>
  );
};

export default DueDateButton;