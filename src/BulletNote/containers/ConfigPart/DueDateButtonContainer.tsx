import React from 'react';
import { Box } from '@material-ui/core';
import { MapStateToProps, MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';
import DueDateButton from 'BulletNote/components/ConfigPart/DueDateButton';
import { DueDateButtonContainerProps } from './types';
import HandleTagSortMessage from 'BulletNote/functions/Handlers/handleTagSortMessage';
import { setBulletNoteConfig } from 'BulletNote/actions/config-actions';
import { dueDateUniqueTag } from 'BulletNote/config';

const DueDateButtonContainer = (props: DueDateButtonContainerProps) => {
  const dueDateMessageListCount = HandleTagSortMessage.filterMessageListByDueDateUniqueTag(props.messageList).length;

  return (
    <DueDateButton 
      {...props}
      dueDateMessageListCount={dueDateMessageListCount}
    />
  );
};

interface OwnProps {}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, {
  messageList: DueDateButtonContainerProps['messageList']
}> = (state) => {
  return ({
    messageList: state.messageList,
  });
};

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  setDueDateModeFn: DueDateButtonContainerProps['setDueDateModeFn']
}> = (dispatch) => {
  return ({
    setDueDateModeFn: () => {
      const action = setBulletNoteConfig({
        noteMode: 'tag-whole-page',
        selectedFilterTags: [
          dueDateUniqueTag,
        ]
      });
      dispatch(action);
    }
  });
};

const DueDateButtonContainerWithCtx = connectCtx(ContextStore)(mapStateToProps, mapDispatchToProps)(DueDateButtonContainer);

export default DueDateButtonContainerWithCtx;