import React from 'react';
import { Box, Typography, Fab } from '@material-ui/core';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { NoteBlockListProps, NoteBlockListWithCtxProps } from '../types';
import HandleMessageList from '../functions/handleMessageListToMessageWithDateList';
import NoteBlockItem from './NoteBlockItem';
import checkDateIsToday from '../functions/checkDateIsToday';
import { ArrowDownward } from '@material-ui/icons';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';

const NoteBlockList = (props: NoteBlockListProps) => {
  const {
    messageList,
    moveToBottomFn,
    bulletNoteConfig,
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

  const messageListWithDateFilterByDaysRange = HandleMessageList
    .filterMessageListByDaysRange(messageListWithDate, bulletNoteConfig.showingDaysRange);
  
  return (
    <Box
      position={'relative'}
    >
      <Box>
        {messageListWithDateFilterByDaysRange.map((m, i) => (
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

const mapStateToProps: MapStateToProps<BulletNoteState, NoteBlockListWithCtxProps, {
  bulletNoteConfig: BulletNoteState['bulletNoteConfig']
}> = (state) => {
  return ({
    bulletNoteConfig: state.bulletNoteConfig
  });
};


const NoteBlockListWithCtx = connectCtx(ContextStore)(mapStateToProps)(NoteBlockList);

export default NoteBlockListWithCtx;