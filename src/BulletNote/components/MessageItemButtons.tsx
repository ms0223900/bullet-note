import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { MessageItemButtonsProps } from './types';

const MessageItemButtons = (props: MessageItemButtonsProps) => {
  return (
    <Box>
      <Button onClick={props.onDelete}>
        <Delete />
      </Button>
    </Box>
  );
};

export default MessageItemButtons;