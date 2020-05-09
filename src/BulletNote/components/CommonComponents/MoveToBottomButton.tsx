import React from 'react';
import { Box, Fab } from '@material-ui/core';
import { ArrowDownward } from '@material-ui/icons';
import { MoveToBottomButtonProps } from './types';

const MoveToBottomButton = (props: MoveToBottomButtonProps) => {
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 80,
        right: 20,
      }}
    >
      <Fab
        size={'small'}
        onClick={props.moveToBottomFn}
      >
        <ArrowDownward />
      </Fab>
    </Box>
  );
};

export default MoveToBottomButton;