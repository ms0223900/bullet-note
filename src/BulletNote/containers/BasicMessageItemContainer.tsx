import React, { useCallback, ChangeEvent } from 'react';
import { Box } from '@material-ui/core';
import BasicMessageItem from '../components/BasicMessageItem';
import { BasicMessageItemContainerProps, BasicMessageItemContainerWithCtxProps } from './types';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { editMessage, toggleMessageIsStar, toggleMessageIsPin } from '../actions/message-actions';
import { connectCtx } from 'react-function-helpers';
import { ContextStore } from '../constants/context';

const BasicMessageItemContainer = (props: BasicMessageItemContainerProps) => {
  const {
    editActionFn,
    starActionFn,
    pinActionFn,
    message
  } = props;
  
  const { id } = message;

  const handleEdit = useCallback((e: ChangeEvent<HTMLElement>) => {
    const { innerText } = e.target;
    editActionFn(id, innerText);
  }, [editActionFn, id]);

  const handleToggleStarMessage = useCallback((isStar: boolean | undefined) => {
    starActionFn(id, isStar);
  }, [id, starActionFn]);

  const handleTogglePinMessage = useCallback((isPin: boolean | undefined) => {
    pinActionFn(id, isPin);
  }, [id, pinActionFn]);

  return (
    <BasicMessageItem
      {...props}
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
    starActionFn: (id, isStar) => {
      const action = toggleMessageIsStar(id, isStar);
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