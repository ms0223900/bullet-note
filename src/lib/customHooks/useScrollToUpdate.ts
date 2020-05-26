import React, { useRef, useCallback, RefObject, useState, useEffect } from "react";
import { Callback } from "common-types";
import DelayTickTock from "BulletNote/functions/DelayTickTock";
import { StartEndIndex } from "BulletNote/types";
import { defaultMessageItemHeight } from "BulletNote/config";

type ScrollToWhere = 'top' | 'bottom'

export interface DomSpecs {
  top?: number
  bottom?: number
}

export interface UseScrollToUpdateOptions {
  scrollToPosition?: number
  scrollToWhere?: ScrollToWhere
  timeoutTime?: number

  updateCb?: Callback
  updateTimeout?: number
}
export interface UseScrollToUpdateStates {
  outerRef: RefObject<HTMLElement>
  domRef: RefObject<HTMLElement>
  handleScroll?: Callback
  loading?: boolean
  startEndIndex: StartEndIndex
}

const defaultRenderAddCount = 5;
const defaultOptions: UseScrollToUpdateOptions = {
  scrollToPosition: 0,
  scrollToWhere: 'top',
  timeoutTime: 10,
  updateTimeout: 500,
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

  static checkDOMIsToPosition(ref: RefObject<HTMLElement>, outerRef: RefObject<HTMLElement>) {
    return (options: UseScrollToUpdateOptions) => {
      const domSpecs = this.getDomSpecs(ref, outerRef);
      // console.log(domSpecs.top, domSpecs.bottom);
      const res = this.checkScrollIsToPostition({
        ...options,
        top: domSpecs.top,
        bottom: domSpecs.bottom,
      });
      return res;
    };
  }
}

export const getListCount = (outerHeight: number) => (
  Math.ceil(outerHeight / defaultMessageItemHeight)
);

export const getStartEndIndexFromDOM = (innerEl: HTMLElement, outerEl: HTMLElement) => {
  const outerHeight = outerEl.offsetHeight;
  const listCount = getListCount(outerHeight);

  let startEndIndex: StartEndIndex = [0, listCount * 1.5];

  const {
    top, bottom,
  } = ScrollToUpdateHandler.calTopBottom(innerEl, outerEl);
  const startPx = Math.abs(top);
  const startIndex = Math.floor(startPx / defaultMessageItemHeight);
  const endIndex = startIndex + listCount;
  
  if(top >= 10) {
    startEndIndex = [0, listCount * 1.5];
  }
  else if(bottom <= defaultMessageItemHeight) {
    startEndIndex = [endIndex - listCount * 3, Infinity];
  }
  else {
    startEndIndex = [
      startIndex - defaultRenderAddCount * 2,
      endIndex + defaultRenderAddCount * 2,
    ];
  }
  // console.log('startEndIndex: ', startEndIndex);
  return startEndIndex;
};

const useScrollToUpdate = (options?: UseScrollToUpdateOptions) => {
  const outerRef = useRef<HTMLElement>(null);
  const myOptions: UseScrollToUpdateOptions = {
    ...defaultOptions,
    ...options,
  };
  const {
    updateTimeout,
    timeoutTime,
    updateCb,
  } = myOptions;

  const domRef = useRef<HTMLElement>(null);
  const updateTickTockRef = useRef(new DelayTickTock({
    timeoutTime: updateTimeout,
  }));
  const scrollTopBottomDelayTickTockRef = useRef(new DelayTickTock({
    timeoutTime: timeoutTime,
  }));

  const [loading, setLoading] = useState(false);
  const [startEndIndex, setStartEndIndex] = useState<StartEndIndex>([0, 20]);
  // const startEndIndexRef = useRef([0, 0]);

  const handleSetStartEndIndex = useCallback(() => {
    if(domRef.current && outerRef.current) {
      const startEndIndexNow = getStartEndIndexFromDOM(domRef.current, outerRef.current);
      const isSameWithPrev = startEndIndexNow.join('') === startEndIndex.join('');

      if(isSameWithPrev)
        return;
      setStartEndIndex(startEndIndexNow);
    }
  }, [startEndIndex]);

  const handleUpdate = useCallback(() => {
    updateCb && updateCb();
    setLoading(false);
  }, [updateCb]);
  const handleRemoveUpdate = useCallback(() => {
    setLoading(false);
  }, []);

  const handleScroll = useCallback(() => {
    const isScrollToPos = ScrollToUpdateHandler.checkDOMIsToPosition(domRef, outerRef)( myOptions);

    if(isScrollToPos && !loading) {
      setLoading(true);
      scrollTopBottomDelayTickTockRef.current.delayCallback(
        handleUpdate
      );
    }
    else if(!isScrollToPos) {
      scrollTopBottomDelayTickTockRef.current.clearTimeoutNow(
        handleRemoveUpdate
      );
    }

    updateTickTockRef.current.delayCallback(
      handleSetStartEndIndex
    );
  }, [handleRemoveUpdate, handleSetStartEndIndex, handleUpdate, loading, myOptions]);

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