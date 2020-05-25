import React from 'react';
import MessageContentPart from 'BulletNote/components/MessageComponents/MessageContentPart';
import { MessageContentPartContainerProps } from './types';

const MessageContentPartContainer = (props: MessageContentPartContainerProps) => {
  return (
    <MessageContentPart 
      {...props}
    />
  );
};

export default MessageContentPartContainer;