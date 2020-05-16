import React from 'react';
import { Box } from '@material-ui/core';
import switchMessagesByType from 'BulletNote/functions/switchMessagesByType';
import { MessageItem } from 'BulletNote/types';

const renderSingleMessageItemFn = (shouldDisplay: boolean) => (messageItemProps: MessageItem, index: number) => {
  return (
    <Box
      style={{
        display: shouldDisplay ? 'block': 'none',
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