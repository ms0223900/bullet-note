import React from 'react';
import { Box } from '@material-ui/core';
import WholeNoteBlockItem from 'BulletNote/components/NotePart/WholeNoteBlockItem';
import { WholeNoteBlogItemContainerProps, WholeNoteBlogItemContainerWithCtxProps } from './types';
import useToggle from 'BulletNote/functions/useToggle';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';

export const useSortTypeRules = () => {
  
};

const WholeNoteBlockItemContainer = (props: WholeNoteBlogItemContainerProps) => {
  const {
    toggle,
    handleToggle,
  } = useToggle(true);

  return (
    <WholeNoteBlockItem
      {...props}
      isShowMessages={toggle}
      toggleShowMessagesFn={handleToggle}
    />
  );
};

const mapStateToProps: MapStateToProps<BulletNoteState, WholeNoteBlogItemContainerWithCtxProps, {
  isFilteringDone: WholeNoteBlogItemContainerProps['isFilteringDone']
}> = (state) => {
  return ({
    isFilteringDone: state.bulletNoteConfig.isFilteringDone,
  });
};

const WholeNoteBlogItemContainerWithCtx = connectCtx(ContextStore)(mapStateToProps)(WholeNoteBlockItemContainer);

export default WholeNoteBlogItemContainerWithCtx;