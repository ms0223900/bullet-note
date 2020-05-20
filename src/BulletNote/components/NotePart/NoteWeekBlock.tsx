import React from 'react';
import splitMessageListWithDataByWeek from 'BulletNote/functions/splitMessageListWithDateByWeek';
import HandleMessageList from 'BulletNote/functions/handleMessageListToMessageWithDateList';
import { NoteWeekBlockProps } from 'BulletNote/types';
import NoteBlockListWithCtx from '../NoteBlockList';
import MoveToBottomWrapper from '../wrappers/MoveToBottomWrapper';
import DelayRenderWrapper from '../wrappers/DelayRenderWrapper';
import { Button } from '@material-ui/core';

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
      <Button>
        {'Add one day'}
      </Button>
      {messageListWithDateSplitByWeek.map((m, i) => (
        // <DelayRenderWrapper delayTimeout={i * 2}>
        <NoteBlockListWithCtx 
          key={i}
          singleMessageListWithDateSplitByWeek={m}
        />
        // </DelayRenderWrapper>
      ))}
    </MoveToBottomWrapper>
  );
};

export default NoteWeekBlock;