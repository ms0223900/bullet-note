import React from 'react';
import { Box, RootRef } from '@material-ui/core';
import NoteBlockList from 'BulletNote/components/NoteBlockList';
import useScrollToView from 'lib/customHooks/useScrollToView';
import { NoteBlockListContainerProps } from './types';

const NoteBlockListContainer = (props: NoteBlockListContainerProps) => {

  return (
    <NoteBlockList
      {...props}
    />
  );
};

export default NoteBlockListContainer;