import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { TagNoteBlockItemProps, MESSAGE_TYPE, MessageItem } from '../types';
import { tabSpace } from '../config';
import { sepMessageListByStarLevelNum } from 'BulletNote/functions/sortMessageListByStarLevelNum';
import { otherColors } from 'BulletNote/theme/theme';
import TagTitle from './NotePart/TagTitle';
import renderSingleMessageItemFn from './_functions/renderSingleMessageItemFn';
import ToggleDisplayWrapper from './wrappers/ToggleDisplayWrapper';

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

const TagNoteBlockItem = (props: TagNoteBlockItemProps) => {
  const {
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
      <ToggleDisplayWrapper
        isDisplay={!handledMessageListByIsDone.isAllDone}
      >
        <TagTitle 
          {...props}
        />
      </ToggleDisplayWrapper>
        
      <Paper
        elevation={1}
      >
        <ToggleDisplayWrapper
          paddingBottom={1}
          isDisplay={isShowMessages}
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
        </ToggleDisplayWrapper>
      </Paper>
    </Box>
  );
};

export default TagNoteBlockItem;