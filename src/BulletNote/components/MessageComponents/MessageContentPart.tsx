import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { MessageContentPartProps } from './types';
import DueDateHandler, { dueDateRegExp } from 'BulletNote/functions/Handlers/DueDateHandler';
import DueDateItemContainer from 'BulletNote/containers/CommonComponents/DueDateItemContainer';
import EditContentContainer from 'BulletNote/containers/MessageComponents/EditContentContainer';
import BulletTagList from '../BullteTagList';

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
  const tagListWithoutDueDate = DueDateHandler.getTagListWithoutDueDateTag(tagList);
  
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
      {dueDate && (
        <BulletTagList
          tagList={tagListWithoutDueDate} 
        />
      )}
      <Box 
        paddingLeft={1}
      >
        {/* <Typography variant={'body1'} color={'textSecondary'}>
          {regDateToString(createdAt)}
        </Typography> */}
        {dueDate && (
          <> 
            {/* <BulletTagList
              tagList={tagList} 
            /> */}
            <DueDateItemContainer 
              date={dueDate}
              dueType={'due-normal'}
            />
          
          </>
        )}
      </Box>
    </Box>
  );
};

export default MessageContentPart;