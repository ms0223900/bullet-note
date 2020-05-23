import React from 'react';
import { Box, RootRef } from '@material-ui/core';
import useScrollToView from 'lib/customHooks/useScrollToView';
import MoveToBottomButton from '../CommonComponents/MoveToBottomButton';
import MoveToTopButton from '../CommonComponents/MoveToTopButton';
import { MoveToBottomWrapperProps } from './types';
import useScrollToUpdate from 'lib/customHooks/useScrollToUpdate';
import { zIndexes } from 'BulletNote/theme/theme';

const MoveToBottomWrapper = (props: MoveToBottomWrapperProps) => {
  const {
    ref,
    handleScrollToView,
  } = useScrollToView(props.scrollToBottomDeps);

  return (
    <RootRef rootRef={ref}>
      <Box 
        zIndex={zIndexes.moveToButtons}
        {...props}
      >
        {props.children}
        <MoveToBottomButton
          moveToBottomFn={handleScrollToView()}
        />
        <MoveToTopButton
          moveToTopFn={handleScrollToView(0)}
        />
      </Box>
    </RootRef>
  );
};

export default MoveToBottomWrapper;