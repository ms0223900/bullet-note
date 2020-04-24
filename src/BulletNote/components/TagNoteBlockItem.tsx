import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { TagNoteBlockItemProps } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import { tabSpace } from '../config';
import useTagStyles from 'BulletNote/styles/stylesObj/useTagStyles';

const TagNoteBlockItem = (props: TagNoteBlockItemProps) => {
  const {
    toggleShowMessagesFn,
    isShowMessages,
  } = props;
  const classes = useTagStyles();

  return (
    <Box paddingLeft={tabSpace}>
      <Box
        display={'flex'}
        alignItems={'center'}
        paddingBottom={0.5}
      >
        <Typography 
          className={classes.root}
          style={{
            display: 'inline-block',
          // backgroundColor: '#eee',
          }}
          variant={'h6'} 
          color={'textPrimary'}
          onClick={toggleShowMessagesFn}
        >
          {props.tagTitle}
        </Typography>
        <Typography
          color={'textSecondary'}
        >
          {props.messageList.length}
        </Typography>
      </Box>
      <Box 
        paddingLeft={tabSpace}
        style={{
          display: isShowMessages ? 'block': 'none',
        }}
      >
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