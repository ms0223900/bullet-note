import React from 'react';
import { Box } from '@material-ui/core';
import MessageContentPart from 'BulletNote/components/MessageComponents/MessageContentPart';
import { MessageContentPartContainerProps } from './types';
import { useFnsByKeyCode } from 'react-function-helpers/lib/lib/customHooks/useFnsByKeyCode';

const MessageContentPartContainer = (props: MessageContentPartContainerProps) => {
  const {
    onEditMessage,
  } = props;

  const [isEditing, setEdit] = React.useState(false);

  const handleConfirmEdit = React.useCallback(() => {
    setEdit(false);
    onEditMessage && onEditMessage();
  }, [onEditMessage]);

  useFnsByKeyCode({
    lastIndex: 0,
    confirmFn: handleConfirmEdit,
    escapeFn: handleConfirmEdit,
  });

  return (
    <MessageContentPart 
      {...props}
      isEditing={isEditing}
      setEditFn={setEdit}
      onConfirmEdit={handleConfirmEdit}
    />
  );
};

export default MessageContentPartContainer;