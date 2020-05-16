import { Ref, RefObject, useRef, useCallback, useEffect } from "react";

const useScrollToView = (deps=[] as any[]) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollToView = useCallback(() => {
    if(ref.current) {
      ref.current.scrollIntoView({
        block: 'end',
      });
    }
  }, []);

  useEffect(() => {
    handleScrollToView();
  }, [handleScrollToView, ...deps]);

  return ({
    ref,
    handleScrollToView,
  });
};

export default useScrollToView;