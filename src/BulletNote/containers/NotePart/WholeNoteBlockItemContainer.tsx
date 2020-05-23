import React from 'react';
import { Box } from '@material-ui/core';
import WholeNoteBlockItem from 'BulletNote/components/NotePart/WholeNoteBlockItem';
import { WholeNoteBlogItemContainerProps, WholeNoteBlogItemContainerWithCtxProps } from './types';
import useToggle from 'BulletNote/functions/useToggle';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';
import useSortTypeRules from 'lib/customHooks/useSortTypeRules';
import sortMessageList from 'BulletNote/components/_functions/sortMessageList';
import getDynamicMessageList from 'BulletNote/components/NotePart/functions/getDynamicMessageList';
import { MessageList, MESSAGE_TYPE, StartEndIndex } from 'BulletNote/types';

export const getMinMaxIndex = (originIndexes: StartEndIndex, newIndexes: StartEndIndex | undefined) => {
  let res: StartEndIndex = originIndexes;

  if(!originIndexes || !newIndexes) {
    return originIndexes;
  } else {
    if(newIndexes[0] < originIndexes[0]) {
      res[0] = newIndexes[0];
    }
    if(newIndexes[1] > originIndexes[1]) {
      res[1] = newIndexes[1];
    }
  }

  return res;
};

export function useDynamicRenderList({
  messageList,
  startEndIndex,
  isFilteringDone,
}: WholeNoteBlogItemContainerProps) {
  const [renderIndex, setIndex] = React.useState<StartEndIndex>(startEndIndex as any);
  const renderIndexRef = React.useRef(startEndIndex);
  
  renderIndexRef.current = getMinMaxIndex(renderIndexRef.current as any, startEndIndex);
  const dynamicMessageList = getDynamicMessageList()({
    messageList, 
    // startEndIndex: renderIndex, 
    startEndIndex: renderIndexRef.current, 
    // startEndIndex: startEndIndex, 
    isFilteringDone
  });

  React.useEffect(() => {
    // if(startEndIndex && startEndIndex[0] === 0 && startEndIndex[1] === Infinity) 
    setIndex(s => getMinMaxIndex(s, startEndIndex));
  }, [startEndIndex]);
  
  console.log(
    startEndIndex, 
    renderIndexRef.current, 
    renderIndex
  );
  
  return ({
    messageList: dynamicMessageList
  });
}

const WholeNoteBlockItemContainer = (props: WholeNoteBlogItemContainerProps) => {
  const {
    startEndIndex,
    isFilteringDone,
    messageList,
  } = props;

  const {
    toggle,
    handleToggle,
  } = useToggle(true);

  const {
    sortTypeRule,
    handleSortByStarNums,
    handleSortByDate,
  } = useSortTypeRules();
  
  const sortedMessageList = sortMessageList(sortTypeRule)(messageList);

  const {
    messageList: dynamicMessageList,
  } = useDynamicRenderList({
    ...props,
    messageList: sortedMessageList,
  });

  return (
    <WholeNoteBlockItem
      {...props}
      messageList={dynamicMessageList}
      sortByStarNumsFn={handleSortByStarNums}
      sortByDateFn={handleSortByDate}
      isShowMessages={toggle}
      toggleShowMessagesFn={handleToggle}
    />
  );
};

const mapStateToProps: MapStateToProps<BulletNoteState, WholeNoteBlogItemContainerWithCtxProps, {
  isFilteringDone: WholeNoteBlogItemContainerProps['isFilteringDone']
}> = (state) => {
  return ({
    isFilteringDone: state.bulletNoteConfig.isFilteringDone,
  });
};

const WholeNoteBlogItemContainerWithCtx = connectCtx(ContextStore)(mapStateToProps)(WholeNoteBlockItemContainer);

export default WholeNoteBlogItemContainerWithCtx;