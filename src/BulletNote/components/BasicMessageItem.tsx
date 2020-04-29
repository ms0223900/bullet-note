import React from 'react';
import { Box, Typography, TextField, Grid } from '@material-ui/core';
import BulletTagList from './BullteTagList';
import { BasicMessageItemProps } from './types';
import MessageButtonsPart from './MessageComponents/MessageButtonsPart';
import MessageContentPart from './MessageComponents/MessageContentPart';
import MessageContentPartContainer from 'BulletNote/containers/MessageComponents/MessageContentPartContainer';

const BasicMessageItem = (props: BasicMessageItemProps) => {
  return (
    <Box 
      display={'flex'} 
      width={'100%'}
    >
      <Grid container>
        <Grid item xs={11}>
          <MessageContentPartContainer 
            {...props} />
        </Grid>
        <Grid item xs={1}>
          <MessageButtonsPart 
            {...props} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicMessageItem;