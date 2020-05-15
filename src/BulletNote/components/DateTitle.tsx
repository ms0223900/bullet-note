import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { DateTitleProps } from '../types';

const removeYearRegExp = /^(\d+\/)/g;

export const getDateTitleStr = (_date: Date | string) => {
  const date = (new Date(_date));
  const day = date.toString().split(' ')[0];

  const dateTitle = date.toLocaleDateString();
  const dateWithoutYear = dateTitle.replace(removeYearRegExp, '');
  
  const strObj = {
    dateWithoutYear,
    day,
  };
  return strObj;
};

const DateTitle = (props: DateTitleProps) => {
  const dateStrObj = getDateTitleStr(props.date);

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
    >
      <Typography variant={'h6'}>
        {dateStrObj.dateWithoutYear}
      </Typography>
      <Box paddingLeft={0.5}>
        <Typography variant={'body1'}>
          {` (${dateStrObj.day}) `}
        </Typography>
      </Box>
    </Box>
  );
};

export default DateTitle;