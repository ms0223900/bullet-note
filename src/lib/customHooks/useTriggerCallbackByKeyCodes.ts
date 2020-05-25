import { Callback } from "common-types";
import { KEY_CODES } from "BulletNote/config";
import { useCallback, useEffect, useRef } from "react";
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

function useTriggerCallbackByKeyCodes(callback: Callback, keyCodes=[defaultKeyCodes]) {
  const keyCodeCompinerRef = useRef(new KeyCodeCombiner({
    keyCodes,
    callback: callback
  }));

  const handleTriggerCallback = useCallback((e: KeyboardEvent) => {
    const { keyCode } = e;
    keyCodeCompinerRef.current.triggerCallbackByKeyCode(keyCode, callback);
  }, [callback]);

  const handleRemoveKKeycode = useCallback((e: KeyboardEvent) => {
    const { keyCode } = e;
    keyCodeCompinerRef.current.removeKeyCode(keyCode);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleTriggerCallback);
    window.addEventListener('keyup', handleRemoveKKeycode);
    return () => {
      window.removeEventListener('keydown', handleTriggerCallback);
      window.removeEventListener('keyup', handleRemoveKKeycode);
    };
  }, [handleRemoveKKeycode, handleTriggerCallback]);
}

export default useTriggerCallbackByKeyCodes;