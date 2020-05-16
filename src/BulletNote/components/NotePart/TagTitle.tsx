import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useTagStyles from 'BulletNote/styles/stylesObj/useTagStyles';
import { TagNoteBlockItemProps } from 'BulletNote/types';

const TagTitle = (props: TagNoteBlockItemProps) => {
  const classes = useTagStyles();

  return (
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
        onClick={props.toggleShowMessagesFn}
      >
        {props.tagTitle}
      </Typography>
      <Typography
        color={'textSecondary'}
      >
        {props.messageList.length}
      </Typography>
    </Box>
  );
};

export default TagTitle;