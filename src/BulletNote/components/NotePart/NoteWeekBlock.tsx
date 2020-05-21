import React from 'react';
import splitMessageListWithDataByWeek from 'BulletNote/functions/splitMessageListWithDateByWeek';
import HandleMessageList from 'BulletNote/functions/handleMessageListToMessageWithDateList';
import { NoteWeekBlockProps } from 'BulletNote/types';
import NoteBlockListWithCtx from '../NoteBlockList';
import MoveToBottomWrapper from '../wrappers/MoveToBottomWrapper';
import { Button, makeStyles, Box, RootRef } from '@material-ui/core';
import { navHeight } from '../CommonComponents/NavBar';
import useNotePartStyles from 'BulletNote/styles/stylesObj/useNotePartStyles';
import useScrollToUpdate from 'lib/customHooks/useScrollToUpdate';

const NoteWeekBlock = (props: NoteWeekBlockProps) => {
  const {
    messageList,
  } = props;
  const classes = useNotePartStyles();

  const {
    outerRef,
    domRef,
    handleScroll,
    startEndIndex,
  } = useScrollToUpdate();
  console.log(startEndIndex);

  const messageListWithDate = HandleMessageList
    .convertToMessageWithDateList(messageList);

  const messageListWithDateSplitByWeek = splitMessageListWithDataByWeek(messageListWithDate);

  return (
    <RootRef
      rootRef={outerRef}
    >
      <MoveToBottomWrapper 
        className={classes.root}
        onScroll={handleScroll}
        scrollToBottomDeps={[props.messageList.length]}
      >
        <RootRef
          rootRef={domRef}
        >
          <Box>
            <Button>
              {'Add one day'}
            </Button>
            {messageListWithDateSplitByWeek.map((m, i) => (
              <NoteBlockListWithCtx 
                key={i}
                singleMessageListWithDateSplitByWeek={m}
              />
            ))}
          </Box>
        </RootRef>
      </MoveToBottomWrapper>
    </RootRef>
  );
};

export default NoteWeekBlock;