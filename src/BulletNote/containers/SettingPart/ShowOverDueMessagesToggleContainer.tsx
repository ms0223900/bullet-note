import React from 'react';
import { Box } from '@material-ui/core';
import { MapStateToProps, MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import ShowOverDueMessagesToggle from 'BulletNote/components/SettingPart/ShowOverDueMessagesToggle';
import { ShowOverDueMessagesToggleContainerProps, ShowOverDueMessagesToggleContainerWithCtxProps, ToggleFromCtxStates, ToggleFromCtxDispatches } from './types';
import { toggleIsShowOverDueMessages } from 'BulletNote/actions/setting-actions';
import { connectCtx } from 'react-function-helpers';

const ShowOverDueMessagesToggleContainer = (props: ShowOverDueMessagesToggleContainerProps) => {
  return (
    <ShowOverDueMessagesToggle 
      checked={props.toggle}
      onChange={props.handleToggle}
    />
  );
};

interface OwnProps extends ShowOverDueMessagesToggleContainerWithCtxProps{}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, ToggleFromCtxStates> = (state) => {
  return ({
    toggle: state.bulletNoteSetting.isShowOverDueMessages,
  });
};

const mapDispatchToProps: MapDispatchToProps<OwnProps, ToggleFromCtxDispatches> = (dispatch) => {
  return ({
    handleToggle: (e, toggle) => {
      const action = toggleIsShowOverDueMessages(toggle);
      dispatch(action);
    }
  });
};

const ShowOverDueMessagesToggleContainerWithCtx = connectCtx(ContextStore)(mapStateToProps, mapDispatchToProps)(ShowOverDueMessagesToggleContainer);

export default ShowOverDueMessagesToggleContainerWithCtx;