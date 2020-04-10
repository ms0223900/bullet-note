import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { DateTitleProps } from '../types';

const removeYearRegExp = /^(\d+\/)/g;

const DateTitle = (props: DateTitleProps) => {
  const dateTitle = (new Date(props.date)).toLocaleDateString();
  const dateWithoutYear = dateTitle.replace(removeYearRegExp, '');
  return (
    <Typography variant={'h5'}>
      {dateWithoutYear}
    </Typography>
  );
};

export default DateTitle;