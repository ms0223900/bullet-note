import React from 'react';
import { Box } from '@material-ui/core';
import switchMessagesByType from 'BulletNote/functions/switchMessagesByType';
import { MessageItem, MESSAGE_TYPE } from 'BulletNote/types';
import checkMessageItemIsDone from 'BulletNote/functions/checkMessageItemIsDone';

const renderSingleMessageItemFn = (shouldDisplay: boolean, isFilteringDone?: boolean) => (messageItemProps: MessageItem, index: number) => {
  const isDone = checkMessageItemIsDone(messageItemProps);
  const isDisplayByIsDone = isFilteringDone ? !isDone : true;

  const isDisplay = shouldDisplay && isDisplayByIsDone;

  return (
    <Box
      style={{
        display: isDisplay ? 'block': 'none',
      }}
    >
      {switchMessagesByType({
        index,
        messageItemProps,
      })}
    </Box>
  );
};

export default renderSingleMessageItemFn;