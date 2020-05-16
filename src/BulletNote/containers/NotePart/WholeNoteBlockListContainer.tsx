import React from 'react';
import { Box } from '@material-ui/core';
import WholeNoteBlockList from 'BulletNote/components/NotePart/WholeNoteBlockList';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { WholeNoteBlockListContainerProps, WholeNoteBlockListContainerWithCtxProps } from './types';
import { connectCtx } from 'react-function-helpers';

const WholeNoteBlockListContainer = (props: WholeNoteBlockListContainerProps) => {
  return (
    <WholeNoteBlockList {...props} />
  );
};

interface OwnProps extends WholeNoteBlockListContainerWithCtxProps {}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, {
  tagList: WholeNoteBlockListContainerProps['tagList']
}> = (state) => {
  return ({
    tagList: state.bulletNoteConfig.selectedFilterTags,
  });
};


const WholeNoteBlockListContainerWithCtx = connectCtx(ContextStore)(mapStateToProps)(WholeNoteBlockListContainer);

export default WholeNoteBlockListContainerWithCtx;