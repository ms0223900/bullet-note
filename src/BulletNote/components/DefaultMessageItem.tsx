import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import { DefaultMessageItemProps } from './types';
import MessageItemWrapperContainerWithCtx from 'BulletNote/containers/wrappers/MessageItemWrapperContainer';
import { KeyboardArrowRight } from '@material-ui/icons';

const DefaultMessageItem = (props: DefaultMessageItemProps) => {
  return (
    <MessageItemWrapperContainerWithCtx
      {...props}
    >
      <Box
        padding={1}
      >
        <KeyboardArrowRight />
      </Box>
    </MessageItemWrapperContainerWithCtx>
  );
};

export default memo(DefaultMessageItem);