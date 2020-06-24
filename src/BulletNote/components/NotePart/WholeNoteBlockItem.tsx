import React from 'react';
import { Box, Paper, Button, Typography } from '@material-ui/core';
import TagTitle from './TagTitle';
import { WholeNoteBlogItemProps } from './types';
import renderSingleMessageItemFn from '../_functions/renderSingleMessageItemFn';
import ToggleDisplayWrapper from '../wrappers/ToggleDisplayWrapper';
import getDateOrMessageItemFromDateMessageList, { WholeNoteBlockComponent } from '../_functions/getDateOrMessageItemFromDateMessageList';
import WholeNoteBlockDateItem from './WholeNoteBlockDateItem';
import sortMessageList from '../../functions/sort-functions/sortMessageList';
import SortButtons from './SortButtons';
import getDynamicMessageList from './functions/getDynamicMessageList';

export interface RenderDataOrMessageItemOptions {
  isFilteringDone: boolean
  isShowDateTagDivier: boolean
}

export const renderDateOrMessageItem = (options: RenderDataOrMessageItemOptions) => (wholeNoteBlockComoponent: WholeNoteBlockComponent, index: number) => {
  const {
    isFilteringDone,
    isShowDateTagDivier,
  } = options;
  
  if(wholeNoteBlockComoponent.type === 'message-item') {
    return (
      renderSingleMessageItemFn(true, isFilteringDone)(wholeNoteBlockComoponent.component, index)
    );
  } 
  
  else if(wholeNoteBlockComoponent.type === 'date' && isShowDateTagDivier) {
    return (
      <WholeNoteBlockDateItem 
        key={wholeNoteBlockComoponent.component.toString()} 
        date={wholeNoteBlockComoponent.component} 
      />
    );
  }

  return null;
};

export const NoMessageInfo = () => {
  return (
    <Typography
      variant={'h6'}
      color={'textSecondary'}
    >
      {'沒有相關訊息 :('}
    </Typography>
  );
};

const WholeNoteBlockItem = (props: WholeNoteBlogItemProps) => {
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
        <Box>
        </Box>
        <Box
          padding={0.5}
        >
          {messageList.length  > 0 ? (
            <ToggleDisplayWrapper isDisplay={isShowMessages}> 
              <SortButtons 
                {...props}
              />
              {dateOrMessageItemList
                .map(renderDateOrMessageItem(props))
              }
            </ToggleDisplayWrapper>
          ) : (
            <NoMessageInfo />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default WholeNoteBlockItem;