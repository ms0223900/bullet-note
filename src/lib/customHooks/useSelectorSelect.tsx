import { useCallback, ChangeEvent, useState, useEffect } from 'react';

export function useSelectorSelect<Values extends {[x: string]: string}>(initValues: Values, cb?: (values: Values) => any) {
  type Name = keyof Values

  const stringifiedInitValues = JSON.stringify(initValues);
  const [values, setValues] = useState(initValues);
  const stringifiedValues = JSON.stringify(values);
  
  const handleSelect = useCallback((name: Name) => (e: ChangeEvent<{ value: unknown }>) => {
    const { value } = e.target;
    setValues(val => {
      const newValues = ({
        ...val,
        [name]: value,
      });
      cb && cb(newValues);
      return newValues;
    });
  }, [cb]);

  const handleResetSelect = useCallback((name: Name) => {
    setValues(val => {
      const newValues = ({
        ...val,
        [name]: '',
      });
      cb && cb(newValues);
      return newValues;
    });
  }, [cb]);

  useEffect(() => {
    setValues(initValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedInitValues]);

  return ({
    values,
    setValues,
    handleResetSelect,
    handleSelect
  });
}

export default useSelectorSelect;
