import { ReactElement } from "react";

export interface GetStartToEndIndexesFromDOMParams {
  indexNow: number,
  listLastIndex: number,
  firstListItem: DOMRect, 
  listPart: DOMRect
}

export interface GetStartToEndIndexesParams {
  indexNow: number, 
  amountOfViewableListItemInListPart: number,
  listLastIndex: number
}

class ListItemIndexesForRenderingHandler {
  static listItemPadding = 8
  static reservingAmountOfItemsForRendering = 5

  static getAmountOfViewableListItemInListPart(listPartHeight: number, listItemHeight: number) {
    return Math.round(listPartHeight / listItemHeight) || 
      this.reservingAmountOfItemsForRendering;
  }
  static getListItemMovementToTop(listPartTop: number, firstListItemTop: number) {
    return listPartTop - firstListItemTop + this.listItemPadding;
  }
  static getListItemIndexByScroll(listItemMovementToTop: number, listItemHeight: number) {
    return Math.floor(listItemMovementToTop / listItemHeight);
  }

  static getSpecs(firstListItem: DOMRect, listPart: DOMRect) {
    const firstListItemTop = firstListItem.top;
    const listItemHeight = firstListItem.height;

    const listPartTop = listPart.top;
    const listPartHeight = listPart.height;

    const amountOfViewableListItemInListPart = this.getAmountOfViewableListItemInListPart(listPartHeight, listItemHeight);

    const listItemMovementToTop = this.getListItemMovementToTop(listPartTop, firstListItemTop);

    const listItemIndexByScroll = this.getListItemIndexByScroll(listItemMovementToTop, listItemHeight);

    return ({
      amountOfViewableListItemInListPart,
      listItemMovementToTop,
      listItemIndexByScroll,
    });
  }

  static getStartIndex(indexNow: number, amountOfViewableListItemInListPart: number) {
    const rawStartIndex = indexNow - amountOfViewableListItemInListPart - this.reservingAmountOfItemsForRendering;

    const startIndex = rawStartIndex < 0 ? 0 : rawStartIndex;

    return startIndex;
  }

  static getEndIndex(params: GetStartToEndIndexesParams) {
    const {
      indexNow,
      amountOfViewableListItemInListPart,
      listLastIndex,
    } = params;

    const rawEndIndex = indexNow + amountOfViewableListItemInListPart * 2 + this.reservingAmountOfItemsForRendering;

    const listItemForRenderingEndIndex = rawEndIndex > listLastIndex ? listLastIndex : rawEndIndex;

    return listItemForRenderingEndIndex;
  }

  static getStartToEndIndexes(params: GetStartToEndIndexesParams) {
    const {
      indexNow,
      amountOfViewableListItemInListPart,
    } = params;

    const listItemForRenderingStartIndex = this.getStartIndex(indexNow, amountOfViewableListItemInListPart);
    const listItemForRenderingEndIndex = this.getEndIndex(params);

    const listItemStartEndIndexesForRendering: [number, number] = [
      listItemForRenderingStartIndex, 
      listItemForRenderingEndIndex
    ];
    return listItemStartEndIndexesForRendering;
  }

  static getStartToEndIndexesFromDOM({
    indexNow,
    listLastIndex,
    firstListItem,
    listPart,
  }: GetStartToEndIndexesFromDOMParams) {
    const specs = this.getSpecs(firstListItem, listPart);
    const startToEndIndexes = this.getStartToEndIndexes({
      ...specs,
      indexNow,
      listLastIndex,
    });
    
    return startToEndIndexes;
  }

  static checkIndexIsInInStartToEndIndexes(index: number, startToEndIndexes: [number, number]) {
    if(index >= startToEndIndexes[0] && index <= startToEndIndexes[1]) {
      return true;
    }
    return false;
  }

  static getSingleSelectOrEmptyListItemByCheckShouldRender(index: number, startToEndIndexesForRendering: [number, number]) {
    return (singleSelect: ReactElement, emptyListItem: ReactElement) => {
      const shouldRender = this.checkIndexIsInInStartToEndIndexes(index, startToEndIndexesForRendering);
      if(shouldRender) {
        return singleSelect;
      }
      return emptyListItem;
    }; 
  }
}

export default ListItemIndexesForRenderingHandler;