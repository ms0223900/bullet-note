import React from 'react';
import { Box, Fab } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { MoveToTopButtonProps } from './types';

const MoveToBottomButton = (props: MoveToTopButtonProps) => {
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 140,
        right: 20,
      }}
    >
      <Fab
        size={'small'}
        onClick={props.moveToTopFn}
      >
        <ArrowUpward />
      </Fab>
    </Box>
  );
};

export default MoveToBottomButton;