import React from 'react';
import { Box } from '@material-ui/core';
import TagTitle from './TagTitle';
import { WholeNoteBlogItemProps } from './types';
import renderSingleMessageItemFn from '../_functions/renderSingleMessageItemFn';
import ToggleDisplayWrapper from '../wrappers/ToggleDisplayWrapper';

const WholeNoteBlogItem = (props: WholeNoteBlogItemProps) => {
  const {
    isFilteringDone,
    messageList,
    isShowMessages,
  } = props;

  return (
    <Box>
      <TagTitle 
        {...props}
      />
      <ToggleDisplayWrapper isDisplay={isShowMessages}> 
        {messageList.map(
          renderSingleMessageItemFn(true, isFilteringDone)
        )}
      </ToggleDisplayWrapper>
    </Box>
  );
};

export default WholeNoteBlogItem;