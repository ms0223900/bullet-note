import React from 'react';
import { Box, Fab } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { MoveToTopButtonProps } from './types';
import { zIndexes } from 'BulletNote/theme/theme';

const MoveToBottomButton = (props: MoveToTopButtonProps) => {
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 140,
        right: 20,
        zIndex: zIndexes.moveToButtons,
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