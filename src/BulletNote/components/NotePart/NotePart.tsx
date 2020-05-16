import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { NotePartProps } from '../types';
import PinMessageListContainer from 'BulletNote/containers/NotePart/PinMessageListContainer';
import NoteWeekBlock from './NoteWeekBlock';
import WholeNoteBlockList from './WholeNoteBlockList';
import WholeNoteBlockListContainerWithCtx from 'BulletNote/containers/NotePart/WholeNoteBlockListContainer';

const useStyles = makeStyles(() => ({
  pinMessageListPart: {
    position: 'sticky',
    top: 0,
    maxHeight: 200,
    overflow: 'auto',
    zIndex: 1000,
    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.07)',
  },
  root: {
    
  }
}));

const NotePart = (props: NotePartProps) => {
  const {
    messageList,
    noteMode,
  } = props;

  const classes = useStyles();
  return (
    <>
      <Box className={classes.pinMessageListPart}>
        <PinMessageListContainer
          messageList={messageList} />
      </Box>
      {noteMode === 'normal' && (
        <NoteWeekBlock 
          key={noteMode}
          messageList={messageList}
        />
      )}
      {noteMode === 'tag-whole-page' && (
        <WholeNoteBlockListContainerWithCtx 
          key={noteMode}
          messageList={messageList}
        />
      )}
    </>
  );
};

export default NotePart;