import { Callback } from "common-types";
import { KEYS } from "BulletNote/config";
import { useCallback, useEffect, useRef, KeyboardEvent } from "react";
import KeyCodeCombiner from "BulletNote/functions/KeyCodeCombiner";

export const getDefaultKeyCodes = () => {
  const osPlatform = navigator.appVersion;
  const isMacOS = osPlatform.indexOf('Mac') !== -1;
  const isWinOS = osPlatform.indexOf('Win') !== -1;

  console.log(osPlatform);
  if(isMacOS) {
    return [KEYS.CMD, KEYS.ENTER];
  }
  return [KEYS.CTRL, KEYS.ENTER];
};

export const defaultKeyCodes = getDefaultKeyCodes();

export interface UseTriggerCallbackByKeyCodesOptions {
  callback: Callback
  keys?: KEYS[][]
  isAutoDetectKeyCode?: boolean
}

function useTriggerCallbackByKeyCodes({
  callback, keys=[defaultKeyCodes], isAutoDetectKeyCode
}: UseTriggerCallbackByKeyCodesOptions) {
  

  const keyCodeCompinerRef = useRef(new KeyCodeCombiner({
    keyCodes: keys,
    callback: callback
  }));

  const handleTriggerCallback = useCallback((e: KeyboardEvent<any>) => {
    const { key } = e;
    keyCodeCompinerRef.current.triggerCallbackByKeyCode(key, callback);
  }, [callback]);

  const handleRemoveKKeycode = useCallback((e: KeyboardEvent<any>) => {
    const { key } = e;
    keyCodeCompinerRef.current.removeKeyCode(key);
  }, []);

  useEffect(() => {
    if(isAutoDetectKeyCode) {
      window.addEventListener('keydown', handleTriggerCallback as any);
      window.addEventListener('keyup', handleRemoveKKeycode as any);
      return () => {
        window.removeEventListener('keydown', handleTriggerCallback as any);
        window.removeEventListener('keyup', handleRemoveKKeycode as any);
      };
    }
  }, [handleRemoveKKeycode, handleTriggerCallback, isAutoDetectKeyCode]);

  return ({
    handleTriggerCallback,
    handleRemoveKKeycode,
  });
}

export default useTriggerCallbackByKeyCodes;