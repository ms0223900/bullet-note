import React from 'react';
import TodoMessageItem from '../components/TodoMessageItem';
import { MessageItem, MESSAGE_TYPE, TagNoteBlockItemProps } from '../types';
import TodoMessageItemContainerWithCtx from '../containers/NotePart/TodoMessageItemContainer';
import DefaultMessageItem from 'BulletNote/components/DefaultMessageItem';
import { Box } from '@material-ui/core';

const switchMessagesByType = ({
  index, 
  messageItemProps,
}: {
  messageItemProps: MessageItem, 
  index: number,
}) => {
  switch (messageItemProps.type) {
    
    case MESSAGE_TYPE.TODO: {
      return (
        <TodoMessageItemContainerWithCtx
          key={messageItemProps.message.id}
          {...messageItemProps}
        />
      );
    }

    case MESSAGE_TYPE.DEFAULT: {
      return (
        <DefaultMessageItem
          key={messageItemProps.message.id}
          {...messageItemProps} />
      );
    }

    case MESSAGE_TYPE.EMPTY: {
      return (
        <Box 
          style={{
            height: 60,
          }}
        />
      );
    }
  
    default:
      return null;
  }
};

export default switchMessagesByType;