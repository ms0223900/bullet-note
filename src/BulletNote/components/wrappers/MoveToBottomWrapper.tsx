import React from 'react';
import { Box, RootRef } from '@material-ui/core';
import useScrollToView from 'BulletNote/functions/useScrollToView';
import MoveToBottomButton from '../CommonComponents/MoveToBottomButton';
import MoveToTopButton from '../CommonComponents/MoveToTopButton';
import { MoveToBottomWrapperProps } from './types';
import useScrollToUpdate from 'lib/customHooks/useScrollToUpdate';

const MoveToBottomWrapper = (props: MoveToBottomWrapperProps) => {
  const {
    ref,
    handleScrollToView,
  } = useScrollToView(props.scrollToBottomDeps);

  return (
    <RootRef rootRef={ref}>
      <Box 
        {...props}
      >
        {props.children}
        <MoveToTopButton
          moveToTopFn={handleScrollToView(0)}
        />
        <MoveToBottomButton
          moveToBottomFn={handleScrollToView()}
        />
      </Box>
    </RootRef>
  );
};

export default MoveToBottomWrapper;