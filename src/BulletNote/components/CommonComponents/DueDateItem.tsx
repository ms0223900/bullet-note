import React from 'react';
import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { DueDateItemProps } from './types';
import WeekDatesHandler from 'BulletNote/functions/WeekDatesHandler';
import DueDateHandler from 'BulletNote/functions/Handlers/DueDateHandler';

export const getDueDateStr = (dueDate: Date) => {
  const date = WeekDatesHandler.convertDateToString(dueDate);
  const hoursMins = WeekDatesHandler.convertDateToHourMin(dueDate);
  const res = `${date} ${hoursMins}`;
  return res;
};

const useStyles = makeStyles<Theme, DueDateItemProps>(theme => ({
  root: {
    fontSize: 14,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: props => {
      if(props.dueType === 'due-soon') {
        return theme.palette.primary.dark;
      }
      return theme.palette.primary.main;
    }
  }
}));

const DueDateItem = (props: DueDateItemProps) => {
  const {
    date,
    dueDateStr,
  } = props;

  const classes = useStyles(props);
  
  return (
    <Box
      className={classes.root}
      title={date.toLocaleString()}
    >
      {dueDateStr}
    </Box>
  );
};

export default DueDateItem;