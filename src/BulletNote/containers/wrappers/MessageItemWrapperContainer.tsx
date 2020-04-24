import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { MessageItemWrapperContainerProps, MessageItemWrapperContainerWithCtxProps } from '../types';
import MessageItemWrapper from 'BulletNote/components/wrappers/MessageItemWrapper';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { deleteMessage, moveMessageToLatest } from 'BulletNote/actions/message-actions';
import { connectCtx } from 'react-function-helpers';
import { ContextStore } from 'BulletNote/constants/context';

const MessageItemWrapperContainer = (props: MessageItemWrapperContainerProps) => {
  const {
    message,
    onDelete,
    onMoverMessageToLatest,
  } = props;

  const {
    id,
  } = message;

  const handleDelete = useCallback(() => {
    if(window.confirm('Are you sure delete?')) {
      onDelete(id);
    }
  }, [id, onDelete]);

  const handleMoveToLatest = useCallback(() => {
    if(window.confirm('Are you sure move message to latest?')) {
      onMoverMessageToLatest(id);
    }
  }, [id, onMoverMessageToLatest]);

  return (
    <MessageItemWrapper
      {...props}
      onDelete={handleDelete}
      onMoverMessageToLatest={handleMoveToLatest} />
  );
};

interface OwnProps extends MessageItemWrapperContainerWithCtxProps {}

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  onDelete: MessageItemWrapperContainerProps['onDelete']
  onMoverMessageToLatest: MessageItemWrapperContainerProps['onMoverMessageToLatest']
}> = (dispatch) => {
  return ({
    onDelete: (id: string) => {
      const action = deleteMessage(id);
      dispatch(action);
    },
    onMoverMessageToLatest: (id: string) => {
      const action = moveMessageToLatest(id);
      dispatch(action);
    },
  });
};

const MessageItemWrapperContainerWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(MessageItemWrapperContainer);

export default MessageItemWrapperContainerWithCtx;