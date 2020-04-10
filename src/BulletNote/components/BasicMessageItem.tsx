import React, { ChangeEvent } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { BasicMessage } from '../types';
import BulletTagList from './BullteTagList';
import { BasicMessageItemProps } from './types';
import MessageItemButtons from './MessageItemButtons';
import StarItemContainer from '../containers/NotePart/StarItemContainer';
import PinItemContainer from '../containers/NotePart/PinItemContainer';

const regDateToString = (date: Date | string) => {
  if(typeof date === 'string') return date;
  const hour = date.getHours();
  const min = date.getMinutes();
  // return '';
  return `${hour}:${min}`;
};

const BasicMessageItem = (props: BasicMessageItemProps) => {
  const {
    content,
    // dateTagList,
    isStared,
    isPin,
    tagList,
    createdAt,
  } = props.message;

  return (
    <Box 
      display={'flex'} 
      alignItems={'center'} 
    >
      <Typography 
        variant={'subtitle1'} 
        contentEditable={true}
        onInput={props.onEditMessage}
      >
        {content}
      </Typography>
      <BulletTagList
        tagList={tagList} />
      <Typography variant={'body1'} color={'textSecondary'}>
        {regDateToString(createdAt)}
      </Typography>
      <StarItemContainer
        isStared={isStared}
        onChange={props.onStarMessage} />
      <PinItemContainer
        isPin={isPin}
        onChange={props.onPinMessage} />
      <MessageItemButtons
        onDelete={props.onDelete} />
    </Box>
  );
};

export default BasicMessageItem;