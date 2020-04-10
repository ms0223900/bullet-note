import React from 'react';
import TodoMessageItem from '../components/TodoMessageItem';
import { MessageItem, MESSAGE_TYPE, TagNoteBlockItemProps } from '../types';
import TodoMessageItemContainerWithCtx from '../containers/NotePart/TodoMessageItemContainer';

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
        key={index}
        {...messageItemProps}
      />
    );
  }
  
  default:
    return null;
  }
};

export default switchMessagesByType;