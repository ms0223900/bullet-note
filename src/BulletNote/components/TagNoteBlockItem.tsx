import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { TagNoteBlockItemProps } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import { tabSpace } from '../config';

const TagNoteBlockItem = (props: TagNoteBlockItemProps) => {
  return (
    <Box paddingLeft={tabSpace}>
      <Typography variant={'h6'} color={'textPrimary'}>
        {props.tagTitle}
      </Typography>
      <Box paddingLeft={tabSpace}>
        {props.messageList.map((messageItemProps, index) => (
          switchMessagesByType({
            index,
            messageItemProps,
          })
        ))}
      </Box>
    </Box>
  );
};

export default TagNoteBlockItem;