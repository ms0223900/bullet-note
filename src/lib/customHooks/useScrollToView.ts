import { Ref, RefObject, useRef, useCallback, useEffect } from "react";

const defaultTop = 100000;

const useScrollToView = (deps=[] as any[]) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollToView = useCallback((top=defaultTop) => {
    return () => {
      if(ref.current) {
        console.log(ref.current.getBoundingClientRect());
        ref.current.scrollTo({
          top,
        });
      }
    };
  }, []);

  useEffect(() => {
    handleScrollToView()();
  }, [handleScrollToView, ...deps]);

  return ({
    ref,
    handleScrollToView,
  });
};

export default useScrollToView;