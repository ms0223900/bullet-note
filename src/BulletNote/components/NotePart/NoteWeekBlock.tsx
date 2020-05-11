import React from 'react';
import { Box, RootRef } from '@material-ui/core';
import splitMessageListWithDataByWeek from 'BulletNote/functions/splitMessageListWithDateByWeek';
import HandleMessageList from 'BulletNote/functions/handleMessageListToMessageWithDateList';
import { NoteWeekBlockProps } from 'BulletNote/types';
import NoteBlockListWithCtx from '../NoteBlockList';
import useScrollToView from 'BulletNote/functions/useScrollToView';
import MoveToBottomButton from '../CommonComponents/MoveToBottomButton';

const NoteWeekBlock = (props: NoteWeekBlockProps) => {
  const {
    messageList,
  } = props;

  const {
    ref,
    handleScrollToView,
  } = useScrollToView([props.messageList.length]);

  const messageListWithDate = HandleMessageList
    .convertToMessageWithDateList(messageList);

  const messageListWithDateSplitByWeek = splitMessageListWithDataByWeek(messageListWithDate);
  return (
    <RootRef rootRef={ref}>
      <Box>
        {messageListWithDateSplitByWeek.map((m, i) => (
          <NoteBlockListWithCtx 
            key={i}
            singleMessageListWithDateSplitByWeek={m}
          />
        ))}
        <MoveToBottomButton 
          moveToBottomFn={handleScrollToView}
        />
      </Box>
    </RootRef>
  );
};

export default NoteWeekBlock;