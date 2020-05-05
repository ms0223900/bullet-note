import React, { useCallback, ChangeEvent } from 'react';
import { Box } from '@material-ui/core';
import BasicMessageItem from '../components/BasicMessageItem';
import { BasicMessageItemContainerProps, BasicMessageItemContainerWithCtxProps } from './types';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { editMessage, setMessageStarLevel, toggleMessageIsPin } from '../actions/message-actions';
import { connectCtx } from 'react-function-helpers';
import { ContextStore } from '../constants/context';
import useInput from 'lib/customHooks/useInput';
import { StarLevelNum } from 'BulletNote/types';

const BasicMessageItemContainer = (props: BasicMessageItemContainerProps) => {
  const {
    editActionFn,
    starActionFn,
    pinActionFn,
    message
  } = props;
  
  const {
    id,
    rawMessage
  } = message;

  const {
    value,
    handleChange,
  } = useInput(rawMessage);

  const handleEdit = useCallback(() => {
    if(value === rawMessage) {
      return;
    }
    editActionFn(id, value);
  }, [editActionFn, id, rawMessage, value]);

  const handleToggleStarMessage = useCallback((starLevelNum: StarLevelNum | undefined) => {
    starActionFn(id, starLevelNum);
  }, [id, starActionFn]);

  const handleTogglePinMessage = useCallback((isPin: boolean | undefined) => {
    pinActionFn(id, isPin);
  }, [id, pinActionFn]);

  return (
    <BasicMessageItem
      {...props}
      value={value}
      onChangeInput={handleChange}
      onPinMessage={handleTogglePinMessage}
      onStarMessage={handleToggleStarMessage}
      onEditMessage={handleEdit} />
  );
};

interface OwnProps extends BasicMessageItemContainerWithCtxProps {}

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  editActionFn: BasicMessageItemContainerProps['editActionFn'],
  starActionFn: BasicMessageItemContainerProps['starActionFn'],
  pinActionFn: BasicMessageItemContainerProps['pinActionFn'],
}> = (dispatch) => {
  return ({
    editActionFn: (id: string, newMessage: string) => {
      const action = editMessage(id, newMessage);
      dispatch(action);
    },
    starActionFn: (id, starLevelNum) => {
      const action = setMessageStarLevel(id, starLevelNum);
      dispatch(action); 
    },
    pinActionFn: (id, isPin) => {
      const action = toggleMessageIsPin(id, isPin);
      dispatch(action); 
    },
  });
};

const BasicMessageItemContainerWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(BasicMessageItemContainer);

export default BasicMessageItemContainerWithCtx;