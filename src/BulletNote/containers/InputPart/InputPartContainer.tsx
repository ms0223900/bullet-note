import React, { useCallback, ChangeEvent } from 'react';
import { Box } from '@material-ui/core';
import useInput from 'lib/customHooks/useInput';
import InputPart from 'BulletNote/components/InputPart/InputPart';
import { MapDispatchToProps, MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { InputPartContainerProps } from '../types';
import { addMessage } from 'BulletNote/actions/message-actions';
import { connectCtx } from 'react-function-helpers';
import { ContextStore, BulletNoteState } from '../../constants/context';
import { useFnsByKeyCode } from 'react-function-helpers/lib/lib/customHooks/useFnsByKeyCode';
import useSelectorSelect from 'lib/customHooks/useSelectorSelect';
import getTagsFromMessageList from 'BulletNote/functions/getTagsFromMessageList';

const InputPartContainer = (props: InputPartContainerProps) => {
  const {
    tags,
  } = props;

  const {
    value,
    setVal,
    handleChange,
  } = useInput();

  const handleAddTagToValue = useCallback((values: { tagValue: string }) => {
    setVal(v => `${v} ${values.tagValue}`);
  }, [setVal]);

  const {
    values,
    handleSelect,
    handleResetSelect,
  } = useSelectorSelect({
    tagValue: '',
  }, handleAddTagToValue);

  const handleSendMessage = useCallback(() => {
    const valueExcludeSpace = value.replace(/\s/g, '');
    
    if(valueExcludeSpace.length > 0) {
      props.addMessageFn(value);
      setVal('');
      handleResetSelect('tagValue');
    }
  }, [handleResetSelect, props, setVal, value]);

  useFnsByKeyCode({
    lastIndex: 0,
    confirmFn: handleSendMessage,
    escapeFn: () => {}
  }); 

  return (
    <InputPart
      tags={tags}
      value={value}
      tagValue={values.tagValue}
      onChange={handleChange}
      onChangeSelect={handleSelect('tagValue')}
      onSendMessage={handleSendMessage}
    />
  );
};

interface OwnProps {}

const mapDispatchToProps: MapDispatchToProps<OwnProps, Omit<InputPartContainerProps, 'tags'>> = (dispatch) => {
  return ({
    addMessageFn: (rawMessage: string) => {
      const action = addMessage(rawMessage);
      dispatch(action);
    }
  });
};

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, {
  tags: string[]
}> = (state) => {
  return ({
    tags: getTagsFromMessageList(state.messageList),
  });
};

const InputPartContainerWithCtx = connectCtx(ContextStore)(mapStateToProps, mapDispatchToProps)(InputPartContainer);

export default InputPartContainerWithCtx;