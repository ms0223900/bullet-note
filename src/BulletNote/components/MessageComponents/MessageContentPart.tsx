import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { MessageContentPartProps } from './types';
import DueDateHandler from 'BulletNote/functions/Handlers/DueDateHandler';
import DueDateItemContainer from 'BulletNote/containers/CommonComponents/DueDateItemContainer';
import EditContentContainer from 'BulletNote/containers/MessageComponents/EditContentContainer';

const addZeroToSmallerThanTenNumber = (num: number) => (
  num < 10 ? `0${num}` : String(num)
);

export const regDateToString = (date: Date | string) => {
  if(typeof date === 'string') return date;
  const hour = addZeroToSmallerThanTenNumber(date.getHours());
  const min = addZeroToSmallerThanTenNumber(date.getMinutes());
  // return '';
  return `${hour}:${min}`;
};

const useStyles = makeStyles(() => ({
  root: {
     
  },
  contentPart: {
    fontSize: '1em',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
  }
}));

const MessageContentPart = (props: MessageContentPartProps) => {
  const {
    onChangeInput,
    message,
  } = props;

  const {
    content,
    tagList,
  } = message;

  const dueDate = DueDateHandler.getMessageItemDueDate(tagList);
  
  return (
    <Box
      display={'flex'} 
      alignItems={'center'}
    >
      <EditContentContainer
        {...props}
        content={content}
        onChange={onChangeInput}
      />
      {/* <BulletTagList
        tagList={tagList} 
        /> */}
      <Box 
        paddingLeft={1}
      >
        {/* <Typography variant={'body1'} color={'textSecondary'}>
          {regDateToString(createdAt)}
        </Typography> */}
        {dueDate && (
          <DueDateItemContainer 
            date={dueDate}
            dueType={'due-normal'}
          />
        )}
      </Box>
    </Box>
  );
};

export default MessageContentPart;