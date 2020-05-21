import React from 'react';
import { Box, Paper, Button } from '@material-ui/core';
import TagTitle from './TagTitle';
import { WholeNoteBlogItemProps } from './types';
import renderSingleMessageItemFn from '../_functions/renderSingleMessageItemFn';
import ToggleDisplayWrapper from '../wrappers/ToggleDisplayWrapper';
import getDateOrMessageItemFromDateMessageList, { WholeNoteBlockComponent } from '../_functions/getDateOrMessageItemFromDateMessageList';
import WholeNoteBlockDateItem from './WholeNoteBlockDateItem';
import sortMessageList from '../_functions/sortMessageList';
import SortButtons from './SortButtons';

export const renderDateOrMessageItem = (isFilteringDone: boolean) => (wholeNoteBlockComoponent: WholeNoteBlockComponent, index: number) => {
  if(wholeNoteBlockComoponent.type === 'message-item') {
    return (
      renderSingleMessageItemFn(true, isFilteringDone)(wholeNoteBlockComoponent.component, index)
    );
  } 
  
  else if(wholeNoteBlockComoponent.type === 'date') {
    return (
      <WholeNoteBlockDateItem 
        key={index} 
        date={wholeNoteBlockComoponent.component} 
      />
    );
  }

  return null;
};

const WholeNoteBlockItem = (props: WholeNoteBlogItemProps) => {
  const {
    sortTypeRule,

    isFilteringDone,
    messageList,
    isShowMessages,
  } = props;

  const sortedMessageList = sortMessageList(sortTypeRule)(messageList);
  
  const dateOrMessageItemList = getDateOrMessageItemFromDateMessageList(sortedMessageList)(isFilteringDone);

  return (
    <Box
      padding={0.5}
      // paddingBottom={2}
    >
      <Paper>
        <TagTitle 
          {...props}
        />
        <SortButtons 
          {...props}
        />
        <Box>
        </Box>
        <Box
          padding={0.5}
        >
          <ToggleDisplayWrapper isDisplay={isShowMessages}> 
            {dateOrMessageItemList
              .map(renderDateOrMessageItem(isFilteringDone))
            }
          </ToggleDisplayWrapper>
        </Box>
      </Paper>
    </Box>
  );
};

export default WholeNoteBlockItem;