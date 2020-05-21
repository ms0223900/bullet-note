import { Ref, RefObject, useRef, useCallback, useEffect } from "react";

const useScrollToView = (deps=[] as any[]) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollToView = useCallback(() => {
    if(ref.current) {
      console.log(ref.current.getBoundingClientRect());
      ref.current.scrollTo({
        top: 1000000,
        
      });
      // ref.current.scrollIntoView({
      //   block: 'end',
      // });
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