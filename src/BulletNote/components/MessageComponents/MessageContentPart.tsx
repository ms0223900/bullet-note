import React from 'react';
import { Box, Typography, TextField, Grid, makeStyles } from '@material-ui/core';
import BulletTagList from '../BullteTagList';
import { BasicMessageItemProps } from '../types';
import { MessageContentPartProps } from './types';
import MessageContentHandler from 'BulletNote/functions/Handlers/MessageContentHandler';
import DueDateItem from '../CommonComponents/DueDateItem';
import DueDateHandler from 'BulletNote/functions/Handlers/DueDateHandler';
import DueDateItemContainer from 'BulletNote/containers/CommonComponents/DueDateItemContainer';
import CustomTextArea from '../InputPart/CustomTextArea';

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
    fontSize: '1.2em',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
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

  const dueDate = DueDateHandler.getMessageItemDueDate(tagList);
  
  return (
    <Box
      display={'flex'} 
      alignItems={'center'}
      onDoubleClick={() => setEditFn(true)}
      onBlur={onConfirmEdit}
    >
      {isEditing ? (
        <CustomTextArea 
          {...props}
          onChange={onChangeInput}
        />
      ) : (
        <Box 
          className={classes.contentPart}
          // variant={'subtitle1'} 
        >
          {MessageContentHandler.renderParsedContent(content)}
        </Box>
      )}
      {/* <BulletTagList
        tagList={tagList} 
        /> */}
      <Box 
        paddingLeft={1}
        style={{
          // opacity: 0.6
        }}
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