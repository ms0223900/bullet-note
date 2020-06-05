import React from 'react';
import { Box, Paper, makeStyles } from '@material-ui/core';
import { TagNoteBlockItemProps, MESSAGE_TYPE, MessageItem } from '../types';
import { tabSpace } from '../config';
import { sepMessageListByStarLevelNum } from 'BulletNote/functions/sort-functions/sortMessageListByStarLevelNum';
import { otherColors } from 'BulletNote/theme/theme';
import TagTitle from './NotePart/TagTitle';
import renderSingleMessageItemFn from './_functions/renderSingleMessageItemFn';
import ToggleDisplayWrapper from './wrappers/ToggleDisplayWrapper';
import checkMessageItemIsDone from 'BulletNote/functions/checkMessageItemIsDone';

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

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(tabSpace),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(0),
    }
  }
}));

const TagNoteBlockItem = (props: TagNoteBlockItemProps) => {
  const {
    messageList,
    isShowMessages,
    isFilteringDone,
  } = props;
  const classes = useStyles();

  const handledMessageListByIsDone = filterMessageListByIsDone(messageList)(isFilteringDone);

  const seperatedMessageListByStar = sepMessageListByStarLevelNum(handledMessageListByIsDone.filteredMessageListByDone);

  return (
    <Box 
      className={classes.root}
    >
        
      <Paper
        elevation={1}
      >
        <ToggleDisplayWrapper
          isDisplay={!handledMessageListByIsDone.isAllDone}
        >
          <TagTitle 
            {...props}
          />
        </ToggleDisplayWrapper>
        <ToggleDisplayWrapper
          // paddingBottom={1}
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