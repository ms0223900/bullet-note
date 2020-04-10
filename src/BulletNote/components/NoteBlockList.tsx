import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { NoteBlockListProps } from '../types';
import HandleMessageList from '../functions/handleMessageListToMessageWithDateList';
import NoteBlockItem from './NoteBlockItem';
import checkDateIsToday from '../functions/checkDateIsToday';

const NoteBlockList = (props: NoteBlockListProps) => {
  const {
    messageList
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
    <Box>
      {messageListWithDate.map((m, i) => (
        <NoteBlockItem
          key={i}
          {...m}
          selected={checkDateIsToday(m.date)} />
      ))}
    </Box>
  );
};

export default NoteBlockList;