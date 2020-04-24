import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Delete, ArrowDownwardRounded } from '@material-ui/icons';
import { MessageItemButtonsProps } from './types';

const MessageItemButtons = (props: MessageItemButtonsProps) => {
  return (
    <Box>
      <Button onClick={props.onDelete}>
        <Delete />
      </Button>
      <Button onClick={props.onMoverMessageToLatest}>
        <ArrowDownwardRounded />
      </Button>
    </Box>
  );
};

export default MessageItemButtons;