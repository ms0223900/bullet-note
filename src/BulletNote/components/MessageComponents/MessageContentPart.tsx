import React from 'react';
import { Box, Typography, TextField, Grid } from '@material-ui/core';
import BulletTagList from '../BullteTagList';
import { BasicMessageItemProps } from '../types';

const regDateToString = (date: Date | string) => {
  if(typeof date === 'string') return date;
  const hour = date.getHours();
  const min = date.getMinutes();
  // return '';
  return `${hour}:${min}`;
};

const MessageContentPart = (props: BasicMessageItemProps) => {
  const {
    content,
    tagList,
    createdAt,
  } = props.message;

  const [isEditing, setEdit] = React.useState(false);
  
  return (
    <Box
      display={'flex'} 
      alignItems={'center'}
      onDoubleClick={() => setEdit(true)}
      onBlur={() => setEdit(false)}
    >
      {isEditing ? (
        <TextField 
          fullWidth={true}
          onChange={props.onEditMessage}
          autoFocus={true}
          value={content} />
      ) : (
        <Typography 
          variant={'subtitle1'} 
        >
          {content}
        </Typography>
      )}
      <BulletTagList
        tagList={tagList} />
      <Typography variant={'body1'} color={'textSecondary'}>
        {regDateToString(createdAt)}
      </Typography>
    </Box>
  );
};

export default MessageContentPart;