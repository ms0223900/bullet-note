import React from 'react';
import { Box, RootRef } from '@material-ui/core';
import NoteBlockList from 'BulletNote/components/NoteBlockList';
import useScrollToView from 'BulletNote/functions/useScrollToView';
import { NoteBlockListContainerProps } from './types';

const NoteBlockListContainer = (props: NoteBlockListContainerProps) => {
  const {
    ref,
    handleScrollToView,
  } = useScrollToView();

  React.useEffect(() => {
    handleScrollToView();
  }, [props.messageList.length, handleScrollToView]);

  return (
    <RootRef rootRef={ref}>
      <NoteBlockList
        {...props}
        moveToBottomFn={handleScrollToView} />
    </RootRef>
  );
};

export default NoteBlockListContainer;