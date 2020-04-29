import React from 'react';
import { Box, Typography, TextField, Grid, makeStyles } from '@material-ui/core';
import BulletTagList from '../BullteTagList';
import { BasicMessageItemProps } from '../types';
import { MessageContentPartProps } from './types';

const addZeroToSmallerThanTenNumber = (num: number) => (
  num < 10 ? `0${num}` : String(num)
);

const regDateToString = (date: Date | string) => {
  if(typeof date === 'string') return date;
  const hour = addZeroToSmallerThanTenNumber(date.getHours());
  const min = addZeroToSmallerThanTenNumber(date.getMinutes());
  // return '';
  return `${hour}:${min}`;
};

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  contentPart: {
    overflowWrap: 'anywhere',
  }
}));

const MessageContentPart = (props: MessageContentPartProps) => {
  const classes = useStyles();
  const {
    value,
    isEditing,
    setEditFn,
    onConfirmEdit,
    onChangeInput,
    message,
  } = props;

  const {
    content,
    tagList,
    rawMessage,
    createdAt,
  } = message;
  
  return (
    <Box
      display={'flex'} 
      alignItems={'center'}
      onDoubleClick={() => setEditFn(true)}
      onBlur={onConfirmEdit}
    >
      {isEditing ? (
        <TextField 
          fullWidth={true}
          onChange={onChangeInput}
          autoFocus={true}
          value={value} />
      ) : (
        <Typography 
          className={classes.contentPart}
          variant={'subtitle1'} 
        >
          {content}
        </Typography>
      )}
      {/* <BulletTagList
        tagList={tagList} 
        /> */}
      <Box 
        paddingLeft={1}
        style={{
          opacity: 0.6
        }}
      >
        <Typography variant={'body1'} color={'textSecondary'}>
          {regDateToString(createdAt)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageContentPart;