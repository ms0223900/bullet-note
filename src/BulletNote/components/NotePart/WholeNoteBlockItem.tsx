import React from 'react';
import { Box, Paper } from '@material-ui/core';
import TagTitle from './TagTitle';
import { WholeNoteBlogItemProps } from './types';
import renderSingleMessageItemFn from '../_functions/renderSingleMessageItemFn';
import ToggleDisplayWrapper from '../wrappers/ToggleDisplayWrapper';
import getDateOrMessageItemFromDateMessageList, { WholeNoteBlockComponent } from '../_functions/getDateOrMessageItemFromDateMessageList';
import WholeNoteBlockDateItem from './WholeNoteBlockDateItem';

export const renderDateOrMessageItem = (isFilteringDone: boolean) => (wholeNoteBlockComoponent: WholeNoteBlockComponent, index: number) => {
  if(wholeNoteBlockComoponent.type === 'message-item') {
    return (
      renderSingleMessageItemFn(true, isFilteringDone)(wholeNoteBlockComoponent.component, index)
    );
  } else if(wholeNoteBlockComoponent.type === 'date') {
    return (
      <WholeNoteBlockDateItem 
        key={index} 
        date={wholeNoteBlockComoponent.component} 
      />
    );
  }
  return null;
};

const WholeNoteBlogItem = (props: WholeNoteBlogItemProps) => {
  const {
    isFilteringDone,
    messageList,
    isShowMessages,
  } = props;

  const dateOrMessageItemList = getDateOrMessageItemFromDateMessageList(messageList)(isFilteringDone);

  return (
    <Box
      padding={0.5}
      // paddingBottom={2}
    >
      <Paper>
        <TagTitle 
          {...props}
        />
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

export default WholeNoteBlogItem;