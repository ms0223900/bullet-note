import { useState, useCallback, ChangeEvent } from "react";

const useInput = (initValue='') => {
  const [value, setVal] = useState(initValue);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVal(value);
  }, []);

  return ({
    handleChange,
    value,
    setVal
  });
};

export default useInput;