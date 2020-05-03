import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { TagNoteBlockItemProps, MESSAGE_TYPE, MessageItem } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import { tabSpace } from '../config';
import useTagStyles from 'BulletNote/styles/stylesObj/useTagStyles';

export const checkMessageItemShouldDisplayByIsFilteringDone = (messageItem: MessageItem, isFilteringDone: boolean) => {
  if(!isFilteringDone) {
    return true;
  } else {
    if(messageItem.type === MESSAGE_TYPE.TODO && messageItem.status.isDone) {
      return false;
    }
    return true;
  }
};

const TagNoteBlockItem = (props: TagNoteBlockItemProps) => {
  const {
    toggleShowMessagesFn,
    isShowMessages,
    isFilteringDone,
  } = props;
  const classes = useTagStyles();

  return (
    <Box paddingLeft={tabSpace}>
      <Box
        display={'flex'}
        alignItems={'center'}
        paddingBottom={0.5}
      >
        <Typography 
          className={classes.root}
          style={{
            display: 'inline-block',
          // backgroundColor: '#eee',
          }}
          variant={'h6'} 
          color={'textPrimary'}
          onClick={toggleShowMessagesFn}
        >
          {props.tagTitle}
        </Typography>
        <Typography
          color={'textSecondary'}
        >
          {props.messageList.length}
        </Typography>
      </Box>
      <Box 
        // paddingLeft={tabSpace}
        paddingBottom={0.5}
        style={{
          display: isShowMessages ? 'block': 'none',
        }}
      >
        {props.messageList.map((messageItemProps, index) => {
          const isShowByFilteringDone = checkMessageItemShouldDisplayByIsFilteringDone(messageItemProps, isFilteringDone);

          return (
            <Box
              style={{
                display: isShowByFilteringDone ? 'block': 'none',
              }}
            >
              {switchMessagesByType({
                index,
                messageItemProps,
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TagNoteBlockItem;