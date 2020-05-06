import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { TagNoteBlockItemProps, MESSAGE_TYPE, MessageItem } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import { tabSpace } from '../config';
import useTagStyles from 'BulletNote/styles/stylesObj/useTagStyles';
import { sepMessageListByStarLevelNum } from 'BulletNote/functions/sortMessageListByStarLevelNum';
import { otherColors } from 'BulletNote/theme/theme';

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

export const TagTitle = (props: TagNoteBlockItemProps) => {
  const classes = useTagStyles();

  return (
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
        onClick={props.toggleShowMessagesFn}
      >
        {props.tagTitle}
      </Typography>
      <Typography
        color={'textSecondary'}
      >
        {props.messageList.length}
      </Typography>
    </Box>
  );
};

const TagNoteBlockItem = (props: TagNoteBlockItemProps) => {
  const {
    toggleShowMessagesFn,
    messageList,
    isShowMessages,
    isFilteringDone,
  } = props;

  const seperatedMessageListByStar = sepMessageListByStarLevelNum(messageList);

  const renderSingleMessageItemFn = (messageItemProps: MessageItem, index: number) => {
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
  };

  return (
    <Box paddingLeft={tabSpace}>
      <TagTitle 
        {...props}
      />
      <Box 
        // paddingLeft={tabSpace}
        paddingBottom={0.5}
        style={{
          display: isShowMessages ? 'block': 'none',
        }}
      >
        {seperatedMessageListByStar.starMessageList.length > 0 && (
          <Box 
            style={{
              borderRadius: 4,
              boxShadow: '0px 3px 10px #eee',
              borderLeft: `3px solid ${otherColors.starPart}`,
            }}
          >
            {seperatedMessageListByStar.starMessageList.map(renderSingleMessageItemFn)}
          </Box>
        )}
        <Box>
          {seperatedMessageListByStar.notStarMessageList.map(renderSingleMessageItemFn)}
        </Box>
      </Box>
    </Box>
  );
};

export default TagNoteBlockItem;