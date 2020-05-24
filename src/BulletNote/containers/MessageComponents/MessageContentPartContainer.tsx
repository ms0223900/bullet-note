import React from 'react';
import MessageContentPart from 'BulletNote/components/MessageComponents/MessageContentPart';
import { MessageContentPartContainerProps } from './types';
import useTriggerCallbackByKeyCodes, { defaultKeyCodes } from 'lib/customHooks/useTriggerCallbackByKeyCodes';
import { KEY_CODES } from 'BulletNote/config';

const MessageContentPartContainer = (props: MessageContentPartContainerProps) => {
  const {
    onEditMessage,
  } = props;

  const [isEditing, setEdit] = React.useState(false);

  const handleConfirmEdit = React.useCallback(() => {
    if(isEditing) {
      setEdit(false);
      onEditMessage && onEditMessage();
    }
  }, [isEditing, onEditMessage]);

  useTriggerCallbackByKeyCodes(handleConfirmEdit, [
    defaultKeyCodes,
    [KEY_CODES.ESC]
  ]);

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