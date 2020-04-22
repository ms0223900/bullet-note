import React from 'react';
import { Box, Typography, Divider, Paper, Button } from '@material-ui/core';
import { PinMessageListProps } from '../types';
import switchMessagesByType from '../../functions/switchMessagesByType';
import { MessageList } from '../../types';

export const filterPinedMessageList = (messageList: MessageList) => {
  return messageList.filter(m => m.message.isPin);
};

const PinMessageList = (props: PinMessageListProps) => {
  const {
    isShowPinMessageList,
    toggleShowPinMessageListFn,
    messageList,
  } = props;

  const filteredPinMessageList = filterPinedMessageList(messageList);

  return (
    <Paper elevation={2}>
      <Box
        display={'flex'}
        alignItems={'center'}
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#fff',
          zIndex: 100,
        }}
      >
        <Typography>
          {'Pin Messages'}
        </Typography>
        <Button
          onClick={toggleShowPinMessageListFn}
        >
          {isShowPinMessageList ? 'Hide' : 'Show'}
        </Button>
      </Box>
      <Box
        style={{
          display: isShowPinMessageList ? 'block' : 'none',
        }}
      >
        {filteredPinMessageList.map((m, index) => (
          switchMessagesByType({
            index,
            messageItemProps: m
          })
        ))}
      </Box>
      <Divider />
    </Paper>
  );
};

export default PinMessageList;