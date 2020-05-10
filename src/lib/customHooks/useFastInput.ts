import React, { useCallback } from 'react';
import FastInputHandler from 'BulletNote/functions/FastInputHandler';
import { KEY_CODES } from 'BulletNote/config';

type SetValueFn = (prevValue: (value: string) => any | string) => any

export interface UseFastInputParams {
  setValueFn: SetValueFn
  fastInputValues: string[]
  triggerKeyCode: number
}

function useFastInput({
  setValueFn,
  fastInputValues,
  triggerKeyCode,
}: UseFastInputParams) {
  const handleFastInput = useCallback(() => {
    setValueFn(value => {
      const handledInputVal = FastInputHandler.handleFastInput(value)(fastInputValues);
      return handledInputVal;
    });
  }, [fastInputValues, setValueFn]);

  const handleFastInputByTab = useCallback((e: KeyboardEvent) => {
    if(e.keyCode === triggerKeyCode) {
      handleFastInput();
    }
  }, [handleFastInput, triggerKeyCode]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleFastInputByTab);

    return () => {
      window.removeEventListener('keydown', handleFastInputByTab);
    };
  }, [handleFastInputByTab]);
}

export default useFastInput;