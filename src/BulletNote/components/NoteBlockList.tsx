import React from 'react';
import { Box, Typography, Fab } from '@material-ui/core';
import { NoteBlockListProps } from '../types';
import HandleMessageList from '../functions/handleMessageListToMessageWithDateList';
import NoteBlockItem from './NoteBlockItem';
import checkDateIsToday from '../functions/checkDateIsToday';
import { ArrowDownward } from '@material-ui/icons';

const NoteBlockList = (props: NoteBlockListProps) => {
  const {
    messageList,
    moveToBottomFn,
  } = props;

  if(messageList.length === 0) {
    return (
      <Typography variant={'h5'} color={'textSecondary'}>
        {'No notes yet :>'}
      </Typography>
    );
  }

  const messageListWithDate = HandleMessageList
    .convertToMessageWithDateList(messageList);
  return (
    <Box
      position={'relative'}
    >
      <Box>
        {messageListWithDate.map((m, i) => (
          <NoteBlockItem
            key={i}
            {...m}
            selected={checkDateIsToday(m.date)} />
        ))}
      </Box>
      <Box
        style={{
          position: 'fixed',
          bottom: 80,
          right: 20,
        }}
      >
        <Fab
          size={'small'}
          onClick={moveToBottomFn}
        >
          <ArrowDownward />
        </Fab>
      </Box>
    </Box>
  );
};

export default NoteBlockList;