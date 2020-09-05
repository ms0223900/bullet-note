import React, { useMemo } from 'react';
import { Box } from '@material-ui/core';
import WholeNoteBlockItem from 'BulletNote/components/NotePart/WholeNoteBlockItem';
import { WholeNoteBlogItemContainerProps, WholeNoteBlogItemContainerWithCtxProps } from './types';
import useToggle from 'lib/customHooks/useToggle';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';
import useSortTypeRules from 'lib/customHooks/useSortTypeRules';
import sortMessageList from 'BulletNote/functions/sort-functions/sortMessageList';
import getDynamicMessageList from 'BulletNote/components/NotePart/functions/getDynamicMessageList';
import { MessageList, MESSAGE_TYPE, StartEndIndex } from 'BulletNote/types';
import { SortButtonsProps } from 'BulletNote/components/NotePart/types';

export const getMinMaxIndex = (originIndexes: StartEndIndex, newIndexes: StartEndIndex | undefined) => {
  let res: StartEndIndex = [...originIndexes] as StartEndIndex;

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
  const messageListKeys = messageList.map(m => m.message.id).join(',');

  const dynamicMessageList = useMemo(() => getDynamicMessageList()({
    messageList, 
    startEndIndex: renderIndex, 
    // startEndIndex: renderIndexRef.current, 
    // startEndIndex: startEndIndex, 
    isFilteringDone
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [isFilteringDone, messageListKeys, renderIndex]);
  // const dynamicMessageList = getDynamicMessageList()({
  //   messageList, 
  //   startEndIndex: renderIndex, 
  //   // startEndIndex: renderIndexRef.current, 
  //   // startEndIndex: startEndIndex, 
  //   isFilteringDone
  // });

  React.useEffect(() => {
    // if(startEndIndex && startEndIndex[0] === 0 && startEndIndex[1] === Infinity) 
    setIndex(s => getMinMaxIndex(s, startEndIndex));
  }, [startEndIndex]);
  
  // console.log(
  //   startEndIndex, 
  //   renderIndexRef.current, 
  //   renderIndex
  // );
  
  return ({
    messageList: dynamicMessageList
  });
}

const WholeNoteBlockItemContainer = (props: WholeNoteBlogItemContainerProps) => {
  const {
    messageList,
  } = props;

  const toggleStates = useToggle(true);
  const toggleStatesProps = {
    isShowMessages: toggleStates.toggle,
    toggleShowMessagesFn: toggleStates.handleToggle,
  };

  const sortTypeRulesStates = useSortTypeRules();
  const sortTypeRulesStatesProps: SortButtonsProps = {
    sortByDateFn: sortTypeRulesStates.handleSortByDate,
    sortByDueDateFn: sortTypeRulesStates.handleSortByDueDate,
    sortByStarNumsFn: sortTypeRulesStates.handleSortByStarNums,
  };
  
  const sortedMessageList = useMemo(() => (
    sortMessageList(sortTypeRulesStates.sortTypeRule)(messageList)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [JSON.stringify(messageList), JSON.stringify(sortTypeRulesStates.sortTypeRule)]);

  const {
    messageList: dynamicMessageList,
  } = useDynamicRenderList({
    ...props,
    messageList: sortedMessageList,
  });

  return (
    <WholeNoteBlockItem
      {...props}
      {...sortTypeRulesStatesProps}
      {...toggleStatesProps}
      messageList={dynamicMessageList}
    />
  );
};

const mapStateToProps: MapStateToProps<BulletNoteState, WholeNoteBlogItemContainerWithCtxProps, {
  isShowDateTagDivier: WholeNoteBlogItemContainerProps['isShowDateTagDivier']
  isFilteringDone: WholeNoteBlogItemContainerProps['isFilteringDone']
}> = (state) => {
  return ({
    isShowDateTagDivier: state.bulletNoteSetting.isShowDateTagDivier,
    isFilteringDone: state.bulletNoteConfig.isFilteringDone,
  });
};

const WholeNoteBlogItemContainerWithCtx = connectCtx(ContextStore)(mapStateToProps)(WholeNoteBlockItemContainer);

export default WholeNoteBlogItemContainerWithCtx;