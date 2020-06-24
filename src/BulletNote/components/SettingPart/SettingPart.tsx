import React from 'react';
import { Box, Modal, makeStyles, Paper } from '@material-ui/core';
import { SettingPartProps } from './types';
import TagWholePageDateTagToggle from 'BulletNote/containers/SettingPart/TagWholePageDateTagToggleContainer';
import ShowOverDueMessagesToggle from 'BulletNote/containers/SettingPart/ShowOverDueMessagesToggleContainer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    minWidth: 300,
    minHeight: 200,
    padding: theme.spacing(1),
  }
}));

const SettingPart = (props: SettingPartProps) => {
  const classes = useStyles();
  return (
    <Modal
      {...props}
      className={classes.root}
    >
      <Paper
        className={classes.modalContent}
      >
        <TagWholePageDateTagToggle />
        <ShowOverDueMessagesToggle />
      </Paper>
    </Modal>
  );
};

export default SettingPart;