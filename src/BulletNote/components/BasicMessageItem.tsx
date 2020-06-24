import React from 'react';
import { Grid, Box, makeStyles } from '@material-ui/core';
import { BasicMessageItemProps } from './types';
import MessageButtonsPart from './MessageComponents/MessageButtonsPart';
import MessageContentPartContainer from 'BulletNote/containers/MessageComponents/MessageContentPartContainer';

const useStyles = makeStyles(theme => ({
  contentPart: {
    width: '95%',
  },
  buttonsPart: {
    width: '5%',
    [theme.breakpoints.down('sm')]: {
      width: '8%',
    }
  },
}));

const BasicMessageItem = (props: BasicMessageItemProps) => {
  const classes = useStyles();

  return (
    <Box 
      display={'flex'} 
      width={'100%'}
      alignItems={'center'}
    >
      <Box className={classes.contentPart}>
        <MessageContentPartContainer 
          {...props} />
      </Box>
      <Box className={classes.buttonsPart}>
        <MessageButtonsPart 
          {...props} />
      </Box>
    </Box>
  );
};

export default BasicMessageItem;