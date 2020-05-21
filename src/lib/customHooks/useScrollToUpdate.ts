import React, { useRef, useCallback, RefObject, useState, useEffect } from "react";
import { Callback } from "common-types";

type ScrollToWhere = 'top' | 'bottom'

export interface DomSpecs {
  top?: number
  bottom?: number
}

export interface UseScrollToUpdateOptions {
  outerRef: RefObject<HTMLElement>
  scrollToPosition?: number
  scrollToWhere?: ScrollToWhere
  timeoutTime?: number
  updateCb?: Callback
}

const defaultMessageItemHeight = 60;
const defaultRenderAddCount = 5;
const defaultOptions: UseScrollToUpdateOptions = {
  outerRef: { current: null },
  scrollToPosition: 0,
  scrollToWhere: 'top',
  timeoutTime: 500,
};

class ScrollToUpdateHandler {
  static calTopBottom(innerEl: HTMLElement, outerEl: HTMLElement) {
    const top = innerEl.getBoundingClientRect().top - outerEl.offsetTop;
    const bottom = innerEl.getBoundingClientRect().bottom - (outerEl.offsetTop + outerEl.offsetHeight);

    return ({
      top,
      bottom
    });
  }

  static checkScrollIsToPostition = (options: UseScrollToUpdateOptions & DomSpecs): boolean => {
    const {
      top, bottom, scrollToWhere, scrollToPosition,
    } = options;
    
    if(scrollToWhere === 'top') {
      const isToTop = Number(top) >= Number(scrollToPosition);
      return isToTop;
    }
    else {
      const isToBottom = Number(bottom) >= Number(scrollToPosition);
      return isToBottom;
    }
  };

  static getDomSpecs(ref: RefObject<HTMLElement>, outerRef: RefObject<HTMLElement>)  {
    let res: DomSpecs = {};
    if(ref.current && outerRef.current) {
      res = this.calTopBottom(ref.current, outerRef.current);
    }
    return res;
  }

  static checkDOMIsToPosition(ref: RefObject<HTMLElement>, options: UseScrollToUpdateOptions) {
    const domSpecs = this.getDomSpecs(ref, options.outerRef);
    // console.log(domSpecs.top, domSpecs.bottom);
    const res = this.checkScrollIsToPostition({
      ...options,
      top: domSpecs.top,
      bottom: domSpecs.bottom,
    });
    return res;
  }
}

export const getStartEndIndexFromDOM = (innerEl: HTMLElement, outerEl: HTMLElement) => {
  let startEndIndex: number[] = [];
  const startPx = Math.abs(
    ScrollToUpdateHandler.calTopBottom(innerEl, outerEl).top
  );
  const outerHeight = outerEl.offsetHeight;
  const listCount = Math.ceil(outerHeight / defaultMessageItemHeight);
  const startIndex = Math.floor(startPx / defaultMessageItemHeight);
  const endIndex = startIndex + listCount;
  startEndIndex = [
    startIndex - defaultRenderAddCount,
    endIndex + defaultRenderAddCount,
  ];
  // console.log('startEndIndex: ', startEndIndex);
  return startEndIndex;
};

const useScrollToUpdate = (options?: UseScrollToUpdateOptions) => {
  const outerRef = useRef<HTMLElement>(null);
  const myOptions: UseScrollToUpdateOptions = {
    ...defaultOptions,
    ...options,
    outerRef,
  };
  const {
    timeoutTime,
    updateCb,
  } = myOptions;

  const domRef = useRef<HTMLElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [loading, setLoading] = useState(false);
  const [startEndIndex, setStartEndIndex] = useState([0, 0]);
  // const startEndIndexRef = useRef([0, 0]);

  const handleSetStartEndIndex = useCallback(() => {
    if(domRef.current && outerRef.current) {
      const startEndIndexNow = getStartEndIndexFromDOM(domRef.current, outerRef.current);
      // startEndIndexRef.current = startEndIndexNow;
      setStartEndIndex(startEndIndexNow);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const isScrollToPos = ScrollToUpdateHandler.checkDOMIsToPosition(domRef, myOptions);

    if(isScrollToPos && !timeoutRef.current && !loading) {
      setLoading(true);
      const domRefNow = domRef.current;

      timeoutRef.current = setTimeout(() => {
        updateCb && updateCb();
        setLoading(false);
        domRefNow?.scrollIntoView({
          block: 'nearest',
        });
      }, timeoutTime as number);
    }

    else if(!isScrollToPos && timeoutRef.current) {
      setLoading(false);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    handleSetStartEndIndex();
  }, [handleSetStartEndIndex, loading, myOptions, timeoutTime, updateCb]);

  useEffect(() => {
    handleSetStartEndIndex();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ({
    outerRef,
    domRef,
    handleScroll,
    loading,
    // startEndIndex: startEndIndexRef.current,
    startEndIndex: startEndIndex,
  });
};

export default useScrollToUpdate;