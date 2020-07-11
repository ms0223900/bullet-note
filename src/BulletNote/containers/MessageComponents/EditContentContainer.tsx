import React from 'react';
import { Box } from '@material-ui/core';
import EditContent from 'BulletNote/components/MessageComponents/EditContent';
import { EditContentContainerProps } from './types';
import useTriggerCallbackByKeyCodes, { defaultKeyCodes } from 'lib/customHooks/useTriggerCallbackByKeyCodes';
import { KEY_CODES } from 'BulletNote/config';
import { Callback } from 'common-types';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';

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

  const {
    handleTriggerCallback,
    handleRemoveKKeycode,
  } = useTriggerCallbackByKeyCodes({
    callback: handleConfirmEdit,
    keyCodes: [
      defaultKeyCodes,
      [KEY_CODES.ESC]
    ]
  });

  return ({
    handleConfirmEdit,
    isEditing,
    setEdit,
    handleTriggerCallback,
    handleRemoveKKeycode,
  });
};

const EditContentContainer = (props: EditContentContainerProps) => {
  const {
    onEditMessage,
  } = props;

  const {
    isEditing,
    setEdit,
    handleConfirmEdit,
    handleTriggerCallback,
    handleRemoveKKeycode,
  } = useEditContent({
    onEditMessage,
  });
  
  return (
    <EditContent 
      {...props}
      onKeyDown={handleTriggerCallback}
      onKeyUp={handleRemoveKKeycode}
      handleConfirmEdit={handleConfirmEdit}
      isEditing={isEditing}
      setEditFn={setEdit}
    />
  );
};

interface StatesFromCtx {
  searchText: BulletNoteState['bulletNoteConfig']['searchingText']
}
interface OwnProps extends Omit<EditContentContainerProps, keyof StatesFromCtx> {}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, StatesFromCtx> = (state) => {
  return ({
    searchText: state.bulletNoteConfig.searchingText,
  });
};

const EditContentContainerWithCtx = connectCtx(ContextStore)(mapStateToProps)(EditContentContainer);

export default EditContentContainerWithCtx;