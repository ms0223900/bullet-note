import React from 'react';
import { Box } from '@material-ui/core';
import WholeNoteBlogItem from 'BulletNote/components/NotePart/WholeNoteBlockItem';
import { WholeNoteBlogItemContainerProps, WholeNoteBlogItemContainerWithCtxProps } from './types';
import useToggle from 'BulletNote/functions/useToggle';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';

const WholeNoteBlogItemContainer = (props: WholeNoteBlogItemContainerProps) => {
  const {
    toggle,
    handleToggle,
  } = useToggle(true);

  return (
    <WholeNoteBlogItem
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

const WholeNoteBlogItemContainerWithCtx = connectCtx(ContextStore)(mapStateToProps)(WholeNoteBlogItemContainer);

export default WholeNoteBlogItemContainerWithCtx;