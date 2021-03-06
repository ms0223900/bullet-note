import React from 'react';
import { Box } from '@material-ui/core';
import WholeNoteBlockList from 'BulletNote/components/NotePart/WholeNoteBlockList';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { WholeNoteBlockListContainerProps, WholeNoteBlockListContainerWithCtxProps } from './types';
import { connectCtx } from 'react-function-helpers';
import useScrollToUpdate from 'lib/customHooks/useScrollToUpdate';
import { WholeNoteBlockListCtxStates } from 'BulletNote/components/NotePart/types';

const WholeNoteBlockListContainer = (props: WholeNoteBlockListContainerProps) => {
  const states = useScrollToUpdate({
    updateTimeout: 250,
  });

  return (
    <WholeNoteBlockList 
      {...props}
      scrollUpdateStates={states}
    />
  );
};

interface OwnProps extends WholeNoteBlockListContainerWithCtxProps {}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, WholeNoteBlockListCtxStates> = (state) => {
  return ({
    isShowOverDueMessages: state.bulletNoteSetting.isShowOverDueMessages,
    searchingText: state.bulletNoteConfig.searchingText,
    tagList: state.bulletNoteConfig.selectedFilterTags,
  });
};


const WholeNoteBlockListContainerWithCtx = connectCtx(ContextStore)(mapStateToProps)(WholeNoteBlockListContainer);

export default WholeNoteBlockListContainerWithCtx;