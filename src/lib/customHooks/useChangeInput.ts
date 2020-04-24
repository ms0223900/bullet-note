import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { Callback } from "common-types";

interface Params {
  initValue?: string | number, 
  cb?: Callback,
  cbTimeout?: number
}

function useChangeInput({
  initValue,
  cb,
  cbTimeout=0
}: Params) {
  const [value, setVal] = useState(initValue);

  const handleChange = useCallback((e: ChangeEvent<any>) => {
    const {
      value,
    } = e.target;

    setVal(value);
  }, []);

  useEffect(() => {
    const cbTimeoutTimer = setTimeout(() => {
      cb && cb(value);
    }, cbTimeout);

    return () => clearTimeout(cbTimeoutTimer);
  }, [cb, cbTimeout, value]);

  return ({
    value,
    setVal,
    handleChange,
  });
}

export default useChangeInput;