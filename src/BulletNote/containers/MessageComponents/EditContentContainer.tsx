import React from 'react';
import { Box } from '@material-ui/core';
import EditContent from 'BulletNote/components/MessageComponents/EditContent';
import { EditContentContainerProps } from './types';
import useTriggerCallbackByKeyCodes, { defaultKeyCodes } from 'lib/customHooks/useTriggerCallbackByKeyCodes';
import { KEY_CODES } from 'BulletNote/config';
import { Callback } from 'common-types';

export const useEditContent = (options: {
  initIsEdit?: boolean,
  onEditMessage: Callback | undefined
}) => {
  const [isEditing, setEdit] = React.useState(!!options.initIsEdit);

  const handleConfirmEdit = React.useCallback(() => {
    if(isEditing) {
      setEdit(false);
      options.onEditMessage && options.onEditMessage();
    }
  }, [isEditing, options]);

  useTriggerCallbackByKeyCodes(handleConfirmEdit, [
    defaultKeyCodes,
    [KEY_CODES.ESC]
  ]);

  return ({
    handleConfirmEdit,
    isEditing,
    setEdit,
  });
};

const EditContentContainer = (props: EditContentContainerProps) => {
  const {
    onEditMessage,
  } = props;

  const {
    isEditing,
    setEdit,
    handleConfirmEdit
  } = useEditContent({
    onEditMessage,
  });
  
  return (
    <EditContent 
      {...props}
      handleConfirmEdit={handleConfirmEdit}
      isEditing={isEditing}
      setEditFn={setEdit}
    />
  );
};

export default EditContentContainer;