import { Ref, RefObject, useRef, useCallback } from "react";

const useScrollToView = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollToView = useCallback(() => {
    if(ref.current) {
      ref.current.scrollIntoView({
        block: 'end',
      });
    }
  }, []);

  return ({
    ref,
    handleScrollToView,
  });
};

export default useScrollToView;