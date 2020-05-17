import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { WholeNoteBlockDateItemProps } from './types';
import { getDateTitleStr } from '../DateTitle';

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  linePart: {
    width: '100%',
    height: 1,
    paddingLeft: theme.spacing(0.5),
    boxSizing: 'border-box',
    backgroundColor: '#ddd'
  }
}));

const WholeNoteBlockDateItem = (props:WholeNoteBlockDateItemProps) => {
  const classes = useStyles();
  const dateStrObj = getDateTitleStr(props.date);

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
    >
      <Typography color={'textSecondary'}>
        {dateStrObj.dateWithoutYear}
      </Typography>
      <Box
        width={'100%'}
        paddingY={0.5}
      >
        <Box 
          className={classes.linePart}
        />
      </Box>
    </Box>
  );
};

export default WholeNoteBlockDateItem;