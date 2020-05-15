import React from 'react';
import { Box, Typography, makeStyles, Paper } from '@material-ui/core';
import { TagNoteBlockItemProps, MESSAGE_TYPE, MessageItem } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import { tabSpace } from '../config';
import useTagStyles from 'BulletNote/styles/stylesObj/useTagStyles';
import { sepMessageListByStarLevelNum } from 'BulletNote/functions/sortMessageListByStarLevelNum';
import { otherColors } from 'BulletNote/theme/theme';

export const checkMessageItemIsDone = (messageItem: MessageItem) => {
  if(messageItem.type === MESSAGE_TYPE.TODO && messageItem.status.isDone) {
    return true;
  }
  return false;
};

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

export type MessageItemWithShouldDisplay = MessageItem & {
  shouldDisplay: boolean
}

export interface FilteredMessageListByIsDone {
  isAllDone: boolean
  filteredMessageListByDone: MessageItemWithShouldDisplay[]
}

export const filterMessageListByIsDone = (messageList: MessageItem[]) => (isFilteringDone: boolean): FilteredMessageListByIsDone => {
  let res: FilteredMessageListByIsDone = {
    isAllDone: true,
    filteredMessageListByDone: []
  };

  for (let i = 0; i < messageList.length; i++) {
    const messageItem = messageList[i];
    const messageItemIsDone = checkMessageItemIsDone(messageItem);
    const shouldDisplay = isFilteringDone ? !messageItemIsDone : true;
    
    if(shouldDisplay) {
      res.isAllDone = false;
    }
    
    res.filteredMessageListByDone = [
      ...res.filteredMessageListByDone,
      {
        ...messageItem,
        shouldDisplay,
      },
    ];
  }

  return res;
};

const renderSingleMessageItemFn = (shouldDisplay: boolean) => (messageItemProps: MessageItem, index: number) => {
  return (
    <Box
      style={{
        display: shouldDisplay ? 'block': 'none',
      }}
    >
      {switchMessagesByType({
        index,
        messageItemProps,
      })}
    </Box>
  );
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

  const handledMessageListByIsDone = filterMessageListByIsDone(messageList)(isFilteringDone);

  const seperatedMessageListByStar = sepMessageListByStarLevelNum(handledMessageListByIsDone.filteredMessageListByDone);

  return (
    <Box 
      paddingLeft={tabSpace}
      paddingBottom={1}
    >
      <Box 
        display={handledMessageListByIsDone.isAllDone ? 'none' : 'block'}
      >
        <TagTitle 
          {...props}
        />
      </Box>
        
      <Paper
        elevation={1}
      >
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
              // borderRadius: 4,
              // boxShadow: '0px 3px 10px #eee',
                borderLeft: `4.5px solid ${otherColors.starPart}`,
              }}
            >
              {seperatedMessageListByStar.starMessageList.map((s: any, i) => renderSingleMessageItemFn(s.shouldDisplay)(s, i))}
            </Box>
          )}
          <Box>
            {seperatedMessageListByStar.notStarMessageList.map((s: any, i) => renderSingleMessageItemFn(s.shouldDisplay)(s, i))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TagNoteBlockItem;