import { useState, useEffect, useCallback } from "react";
import { Callback } from "common-types";

const useToggle = (init?: boolean, onChange?: Callback) => {
  const [toggle, setToggle] = useState(!!init);

  const handleToggle = useCallback(() => {
    setToggle(s => !s);
  }, []);

  useEffect(() => {
    onChange && onChange(toggle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  useEffect(() => {
    setToggle(!!init);
  }, [init]);

  return ({
    toggle,
    setToggle,
    handleToggle,
  });
};

export default useToggle;