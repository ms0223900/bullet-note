import React from 'react';
import { Box } from '@material-ui/core';
import { DefaultMessageItemProps } from './types';
import MessageItemWrapperContainerWithCtx from 'BulletNote/containers/wrappers/MessageItemWrapperContainer';
import { KeyboardArrowRight } from '@material-ui/icons';

const DefaultMessageItem = (props: DefaultMessageItemProps) => {
  return (
    <MessageItemWrapperContainerWithCtx
      {...props}>
      <KeyboardArrowRight />
    </MessageItemWrapperContainerWithCtx>
  );
};

export default DefaultMessageItem;