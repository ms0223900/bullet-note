import React from 'react';
import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { DueDateItemProps } from './types';
import WeekDatesHandler from 'BulletNote/functions/WeekDatesHandler';

export const getDueDateStr = (dueDate: Date) => {
  const date = WeekDatesHandler.convertDateToString(dueDate);
  const hoursMins = WeekDatesHandler.convertDateToHourMin(dueDate);
  const res = `${date} ${hoursMins}`;
  return res;
};

const useStyles = makeStyles<Theme, DueDateItemProps>(theme => ({
  root: {
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
  const classes = useStyles(props);
  const dueDateStr = getDueDateStr(props.date);
  
  return (
    <Typography
      className={classes.root}
      variant={'subtitle2'}
    >
      {dueDateStr}
    </Typography>
  );
};

export default DueDateItem;