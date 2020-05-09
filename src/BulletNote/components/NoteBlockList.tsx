import React, { memo, useMemo } from 'react';
import { Box, Typography, Fab, Divider } from '@material-ui/core';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { NoteBlockListProps, NoteBlockListWithCtxProps } from '../types';
import HandleMessageList from '../functions/handleMessageListToMessageWithDateList';
import NoteBlockItem from './NoteBlockItem';
import checkDateIsToday from '../functions/checkDateIsToday';
import { ArrowDownward } from '@material-ui/icons';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';
import WeekDatesHandler from 'BulletNote/functions/WeekDatesHandler';
import useToggle from 'BulletNote/functions/useToggle';

const NoteBlockList = (props: NoteBlockListProps) => {
  const {
    singleMessageListWithDateSplitByWeek,
    bulletNoteConfig,
  } = props;

  const {
    messageListWithDateList,
  } = singleMessageListWithDateSplitByWeek;
  
  const {
    showingDaysRange,
  } = bulletNoteConfig;

  const {
    toggle,
    handleToggle,
  } = useToggle(true);

  const weekTitle = (
    <Typography
      color={'primary'}
      variant={'h5'}
      style={{
        cursor: 'pointer',
      }}
      onClick={handleToggle}
    >
      {singleMessageListWithDateSplitByWeek.weekFromToStr}
    </Typography>
  );

  const messageListWithDateFilterByDaysRange = HandleMessageList
    .filterMessageListByDaysRange(messageListWithDateList, showingDaysRange);
  
  return (
    <Box
      position={'relative'}
    >
      {messageListWithDateFilterByDaysRange.length > 0 && (
        <>{weekTitle}</>
      )}
      <Box
        style={{
          display: toggle ? 'block' : 'none',
        }}
      >
        {messageListWithDateFilterByDaysRange.map((m, i) => (
          <NoteBlockItem
            {...m}
            key={m.date.toString()}
            selected={checkDateIsToday(m.date)} />
        ))}
      </Box>
      <Divider />
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