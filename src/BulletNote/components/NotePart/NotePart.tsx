import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { NotePartProps } from '../types';
import DownloadMessageListWithCtx from '../DownloadMessageList';
import RestoreBackup from '../RestoreBackup';
import NoteBlockListContainer from 'BulletNote/containers/NoteBlockListContainer';
import PinMessageListContainer from 'BulletNote/containers/NotePart/PinMessageListContainer';

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
  const classes = useStyles();
  return (
    <>
      <Box className={classes.pinMessageListPart}>
        <PinMessageListContainer
          messageList={props.messageList} />
      </Box>
      <NoteBlockListContainer
        {...props} />
    </>
  );
};

export default NotePart;