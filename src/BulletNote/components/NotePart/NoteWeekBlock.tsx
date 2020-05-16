import React from 'react';
import { Box, RootRef } from '@material-ui/core';
import splitMessageListWithDataByWeek from 'BulletNote/functions/splitMessageListWithDateByWeek';
import HandleMessageList from 'BulletNote/functions/handleMessageListToMessageWithDateList';
import { NoteWeekBlockProps } from 'BulletNote/types';
import NoteBlockListWithCtx from '../NoteBlockList';
import useScrollToView from 'BulletNote/functions/useScrollToView';
import MoveToBottomButton from '../CommonComponents/MoveToBottomButton';
import MoveToBottomWrapper from '../wrappers/MoveToBottomWrapper';

const NoteWeekBlock = (props: NoteWeekBlockProps) => {
  const {
    messageList,
  } = props;

  const messageListWithDate = HandleMessageList
    .convertToMessageWithDateList(messageList);

  const messageListWithDateSplitByWeek = splitMessageListWithDataByWeek(messageListWithDate);
  return (
    <MoveToBottomWrapper 
      scrollToBottomDeps={[props.messageList.length]}
    >
      {messageListWithDateSplitByWeek.map((m, i) => (
        <NoteBlockListWithCtx 
          key={i}
          singleMessageListWithDateSplitByWeek={m}
        />
      ))}
    </MoveToBottomWrapper>
  );
};

export default NoteWeekBlock;