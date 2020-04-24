import { useCallback, ChangeEvent, useState, useEffect } from 'react';

export function useSelectorSelect<Values extends {[x: string]: string}>(initValues: Values, cb?: (values: Values) => any) {
  const stringifiedInitValues = JSON.stringify(initValues);
  const [values, setValues] = useState(initValues);
  
  const handleSelect = useCallback((name: keyof Values) => (e: ChangeEvent<{ value: unknown }>) => {
    const { value } = e.target;
    setValues(val => ({
      ...val,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    cb && cb(values);
  }, [cb, values]);

  useEffect(() => {
    setValues(initValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedInitValues]);

  return ({
    values,
    setValues,
    handleSelect
  });
}

export default useSelectorSelect;
