import React from 'react';
import { Box, RootRef } from '@material-ui/core';
import useScrollToView from 'BulletNote/functions/useScrollToView';
import MoveToBottomButton from '../CommonComponents/MoveToBottomButton';
import { MoveToBottomWrapperProps } from './types';

const MoveToBottomWrapper = (props: MoveToBottomWrapperProps) => {
  const {
    ref,
    handleScrollToView,
  } = useScrollToView(props.scrollToBottomDeps);

  return (
    <RootRef rootRef={ref}>
      <Box>
        {props.children}
        <MoveToBottomButton
          moveToBottomFn={handleScrollToView}
        />
      </Box>
    </RootRef>
  );
};

export default MoveToBottomWrapper;