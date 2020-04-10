import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import useInput from 'lib/customHooks/useInput';
import InputPart from 'BulletNote/components/InputPart/InputPart';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { InputPartContainerProps } from '../types';
import { addMessage } from 'BulletNote/actions/message-actions';
import { connectCtx } from 'react-function-helpers';
import { ContextStore } from '../../constants/context';
import { useFnsByKeyCode } from 'react-function-helpers/lib/lib/customHooks/useFnsByKeyCode';

const InputPartContainer = (props: InputPartContainerProps) => {
  const {
    value,
    setVal,
    handleChange,
  } = useInput();

  const handleSendMessage = useCallback(() => {
    if(value.length > 0) {
      props.addMessageFn(value);
      setVal('');
    }
  }, [props, setVal, value]);

  useFnsByKeyCode({
    lastIndex: 0,
    confirmFn: handleSendMessage,
    escapeFn: () => {}
  }); 

  return (
    <InputPart
      value={value}
      onChange={handleChange}
      onSendMessage={handleSendMessage} />
  );
};

interface OwnProps {}

const mapDispatchToProps: MapDispatchToProps<OwnProps, InputPartContainerProps> = (dispatch) => {
  return ({
    addMessageFn: (rawMessage: string) => {
      const action = addMessage(rawMessage);
      dispatch(action);
    }
  });
};

const InputPartContainerWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(InputPartContainer);

export default InputPartContainerWithCtx;