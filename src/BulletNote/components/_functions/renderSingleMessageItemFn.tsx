import React from 'react';
import { Box } from '@material-ui/core';
import switchMessagesByType from 'BulletNote/functions/switchMessagesByType';
import { MessageItem, MESSAGE_TYPE } from 'BulletNote/types';
import checkMessageItemIsDone from 'BulletNote/functions/checkMessageItemIsDone';
import ToggleDisplayWrapper from '../wrappers/ToggleDisplayWrapper';

const renderSingleMessageItemFn = (shouldDisplay: boolean, isFilteringDone?: boolean) => (messageItemProps: MessageItem, index: number) => {
  const isDone = checkMessageItemIsDone(messageItemProps);
  const isDisplayByIsDone = isFilteringDone ? !isDone : true;

  const isDisplay = shouldDisplay && isDisplayByIsDone;

  return (
    <ToggleDisplayWrapper
      key={messageItemProps.message.id}
      isDisplay={isDisplay}
    >
      {switchMessagesByType({
        index,
        messageItemProps,
      })}
    </ToggleDisplayWrapper>
  );
};

export default renderSingleMessageItemFn;