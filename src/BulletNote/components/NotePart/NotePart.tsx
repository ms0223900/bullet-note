import React from 'react';
import { Box, makeStyles, RootRef } from '@material-ui/core';
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
    notePartRef,
    messageList,
    noteMode,
  } = props;
  const classes = useStyles();

  return (
    <RootRef
      rootRef={notePartRef}
    >
      <Box>
        <Box className={classes.pinMessageListPart}>
          <PinMessageListContainer
            messageList={messageList} />
        </Box>
        <Box>
          {noteMode === 'normal' && (
            <NoteWeekBlock 
              key={noteMode}
              messageList={messageList}
            />
          )}
        </Box>
        {noteMode === 'tag-whole-page' && (
          <WholeNoteBlockListContainerWithCtx 
            key={noteMode}
            messageList={messageList}
          />
        )}
      </Box>
    </RootRef>
    
  );
};

export default NotePart;