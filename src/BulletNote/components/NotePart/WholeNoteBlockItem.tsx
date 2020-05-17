import React from 'react';
import { Box } from '@material-ui/core';
import TagTitle from './TagTitle';
import { WholeNoteBlogItemProps } from './types';
import renderSingleMessageItemFn from '../_functions/renderSingleMessageItemFn';
import ToggleDisplayWrapper from '../wrappers/ToggleDisplayWrapper';
import getDateOrMessageItemFromDateMessageList from '../_functions/getDateOrMessageItemFromDateMessageList';
import WholeNoteBlockDateItem from './WholeNoteBlockDateItem';

const WholeNoteBlogItem = (props: WholeNoteBlogItemProps) => {
  const {
    isFilteringDone,
    messageList,
    isShowMessages,
  } = props;

  const dateOrMessageItemList = getDateOrMessageItemFromDateMessageList(messageList);

  return (
    <Box>
      <TagTitle 
        {...props}
      />
      <ToggleDisplayWrapper isDisplay={isShowMessages}> 
        {dateOrMessageItemList.map((s, i) => {
          if(s.type === 'message-item') {
            return (
              renderSingleMessageItemFn(true, isFilteringDone)(s.component, i)
            );
          } else if(s.type === 'date') {
            return (
              <WholeNoteBlockDateItem date={s.component}/>
            );
          }
          return null;
        })}
      </ToggleDisplayWrapper>
    </Box>
  );
};

export default WholeNoteBlogItem;