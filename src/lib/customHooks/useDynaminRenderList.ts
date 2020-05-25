/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import ListItemIndexesForRenderingHandler from "../ListItemIndexesForRenderingHandler";

export const initStarToEndIndexes: [number, number] = [0, 20];
export const initListItemIndexNow = 0;

const useDynamiceRenderList = (list: any[], selectedIndexFromProps?: number) => {
  const listLength = list.length;
  const listLastIndex = listLength - 1;

  const listPartRef = React.useRef<HTMLDivElement>(null);
  const listRefs = list.map(() => (
    React.createRef<HTMLDivElement>()
  ));

  const [startToEndIndexesForRendering, setIndexes] = useState<[number, number]>(initStarToEndIndexes);
  const [listItemIndexNow, setListItemIndexNow] = useState(initListItemIndexNow);

  const handleUpdateStartToEndIndexes = (indexNow: number, listLastIndex: number) => {
    if(listRefs[0] && listRefs[0].current && listPartRef.current) {
      const listPart = listPartRef.current.getClientRects()[0];
      const firstListItem = listRefs[0].current.getClientRects()[0];
      
      const startToEndIndexesFromDOM = ListItemIndexesForRenderingHandler
        .getStartToEndIndexesFromDOM({
          indexNow,
          listLastIndex,
          firstListItem,
          listPart,
        });
      if(startToEndIndexesFromDOM[1] > initStarToEndIndexes[1]) {
        setIndexes(startToEndIndexesFromDOM);
      }
      
    }
  };

  React.useEffect(() => {
    if(typeof selectedIndexFromProps === 'number') {
      setListItemIndexNow(selectedIndexFromProps);
    }
  }, [selectedIndexFromProps]);

  React.useEffect(() => {
    handleUpdateStartToEndIndexes(listItemIndexNow, listLastIndex);
  }, [listItemIndexNow, listLastIndex]);

  const handleScroll = useCallback(() => {
    if(listRefs[0] && listRefs[0].current && listPartRef.current) {
      const listPart = listPartRef.current.getClientRects()[0];
      const firstListItem = listRefs[0].current.getClientRects()[0];

      const specs = ListItemIndexesForRenderingHandler
        .getSpecs(firstListItem, listPart);

      const { listItemIndexByScroll } = specs;
      setListItemIndexNow(listItemIndexByScroll);
    }
  }, [listRefs]);
  console.log(startToEndIndexesForRendering);

  return ({
    listPartRef,
    listRefs,

    startToEndIndexesForRendering,
    listItemIndexNow,
    
    setListItemIndexNow,
    handleScroll,
    handleUpdateStartToEndIndexes,
  });
};

export default useDynamiceRenderList;