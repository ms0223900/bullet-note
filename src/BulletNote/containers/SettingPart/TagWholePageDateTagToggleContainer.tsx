import React from 'react';
import { Box } from '@material-ui/core';
import { MapStateToProps, MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import TagWholePageDateTagToggle from 'BulletNote/components/SettingPart/TagWholePageDateTagToggle';
import { TagWholePageDateTagToggleContainerProps, TagWholePageDateTagToggleContainerWithCtxProps } from './types';
import { toggleIsShowDateTagDivier } from 'BulletNote/actions/setting-actions';
import { connectCtx } from 'react-function-helpers';

const TagWholePageDateTagToggleContainer = (props: TagWholePageDateTagToggleContainerProps) => {
  return (
    <TagWholePageDateTagToggle 
      onChange={props.handleToggle}
      checked={props.toggle}
    />
  );
};

interface OwnProps extends TagWholePageDateTagToggleContainerWithCtxProps {}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, {
  toggle: TagWholePageDateTagToggleContainerProps['toggle']
}> = (state) => {
  return ({
    toggle: state.bulletNoteSetting.isShowDateTagDivier,
  });
};

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  handleToggle: TagWholePageDateTagToggleContainerProps['handleToggle']
}> = (dispatch) => {
  return ({
    handleToggle: (e, checked) => {
      const action = toggleIsShowDateTagDivier(checked);
      dispatch(action);
    }
  });
};


const TagWholePageDateTagToggleContainerWithCtx = connectCtx(ContextStore)(mapStateToProps, mapDispatchToProps)(TagWholePageDateTagToggleContainer);

export default TagWholePageDateTagToggleContainerWithCtx;