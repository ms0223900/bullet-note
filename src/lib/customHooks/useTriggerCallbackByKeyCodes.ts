import { Callback } from "common-types";
import { KEY_CODES } from "BulletNote/config";
import { useCallback, useEffect, useRef, KeyboardEvent } from "react";
import KeyCodeCombiner from "BulletNote/functions/KeyCodeCombiner";

export const getDefaultKeyCodes = () => {
  const osPlatform = navigator.appVersion;
  const isMacOS = osPlatform.indexOf('Mac') !== -1;
  const isWinOS = osPlatform.indexOf('Win') !== -1;

  console.log(osPlatform);
  if(isMacOS) {
    return [KEY_CODES.CMD, KEY_CODES.ENTER];
  }
  return [KEY_CODES.CTRL, KEY_CODES.ENTER];
};

export const defaultKeyCodes = getDefaultKeyCodes();

export interface UseTriggerCallbackByKeyCodesOptions {
  callback: Callback
  keyCodes?: KEY_CODES[][]
  isAutoDetectKeyCode?: boolean
}

function useTriggerCallbackByKeyCodes({
  callback, keyCodes=[defaultKeyCodes], isAutoDetectKeyCode
}: UseTriggerCallbackByKeyCodesOptions) {
  

  const keyCodeCompinerRef = useRef(new KeyCodeCombiner({
    keyCodes,
    callback: callback
  }));

  const handleTriggerCallback = useCallback((e: KeyboardEvent<any>) => {
    const { keyCode } = e;
    keyCodeCompinerRef.current.triggerCallbackByKeyCode(keyCode, callback);
  }, [callback]);

  const handleRemoveKKeycode = useCallback((e: KeyboardEvent<any>) => {
    const { keyCode } = e;
    keyCodeCompinerRef.current.removeKeyCode(keyCode);
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