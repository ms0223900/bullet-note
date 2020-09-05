import React, { memo } from 'react';
import { Box, makeStyles, RootRef } from '@material-ui/core';
import { NotePartProps } from '../types';
import PinMessageListContainer from 'BulletNote/containers/NotePart/PinMessageListContainer';
import NoteWeekBlock from './NoteWeekBlock';
import WholeNoteBlockList from './WholeNoteBlockList';
import WholeNoteBlockListContainerWithCtx from 'BulletNote/containers/NotePart/WholeNoteBlockListContainer';
import { navHeight } from '../CommonComponents/NavBar';
import { zIndexes } from 'BulletNote/theme/theme';

const useStyles = makeStyles(() => ({
  pinMessageListPart: {
    position: 'sticky',
    top: navHeight,
    maxHeight: 200,
    overflow: 'auto',
    zIndex: zIndexes.pinMessageList,
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
      </Box>
    </RootRef>
    
  );
};

export default memo(NotePart);