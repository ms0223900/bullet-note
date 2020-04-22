import React from 'react';
import { Box, makeStyles, Paper } from '@material-ui/core';
import StarItemContainer from 'BulletNote/containers/NotePart/StarItemContainer';
import PinItemContainer from 'BulletNote/containers/NotePart/PinItemContainer';
import MessageItemButtons from '../MessageItemButtons';
import { MessageButtonsPartProps } from './types';
import { MoreHoriz } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
       
    }
  },
  morePart: {
    position: 'relative',
    cursor: 'pointer',
    opacity: 0.8,

    '& > div': {
      position: 'absolute',
      top: -30,
      right: 0,
      width: 110,
      display: 'none',
    },
    '&:hover > div': {
      display: 'flex',
    }
  }
}));

const MessageButtonsPart = (props: MessageButtonsPartProps) => {
  const classes = useStyles();
  const {
    message, 
  } = props;

  const {
    isStared,
    isPin,
  } = message;

  return (
    <Box
      position={'relative'}
      display={'flex'} 
      alignItems={'center'} 
    >
      <Box
        className={classes.morePart}
      >
        <MoreHoriz />
        <Paper>
          <Box
            display={'flex'} 
            alignItems={'center'}
          >
            <MessageItemButtons
              onDelete={props.onDelete} />
            <StarItemContainer
              isStared={isStared}
              onChange={props.onStarMessage} />
            <PinItemContainer
              isPin={isPin}
              onChange={props.onPinMessage} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MessageButtonsPart;