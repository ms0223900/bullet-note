import React from 'react';
import { Box, makeStyles, Paper } from '@material-ui/core';
import StarItemContainer from 'BulletNote/containers/NotePart/StarItemContainer';
import PinItemContainer from 'BulletNote/containers/NotePart/PinItemContainer';
import MessageItemButtons from '../MessageItemButtons';
import { MessageButtonsPartProps } from './types';
import { MoreHoriz, Star } from '@material-ui/icons';
import StarLevelContainer from 'BulletNote/containers/CommonComponents/StarLevelContainer';
import { otherColors } from 'BulletNote/theme/theme';

const buttonPartWidth = 154;

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
       
    }
  },

  starItem: {
    display: 'flex',
    alignContent: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },

  morePart: {
    position: 'relative',
    cursor: 'pointer',
    opacity: 0.8,

    '& > div': {
      position: 'absolute',
      top: -70,
      right: 0,
      width: buttonPartWidth,
      display: 'none',
    },
    '&:hover > div': {
      display: 'flex',
    }
  }
}));

const starDisplayItem = (starLevelNum?: number) => {
  if(starLevelNum) {
    return (
      <>
        <Star 
          style={{
            fill: otherColors.starPart,
          }}
        />
        <Box component={'span'}>
          {starLevelNum}
        </Box>
      </>
    );
  }
  return null;
};

const MessageButtonsPart = (props: MessageButtonsPartProps) => {
  const classes = useStyles();
  const {
    message, 
  } = props;

  const {
    starLevelNum,
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
              onDelete={props.onDelete}
              onMoverMessageToLatest={props.onMoverMessageToLatest} />
            <StarLevelContainer 
              initStarLevelNum={starLevelNum}
              setStarLevelNumToCtx={props.onStarMessage}
            />
            <PinItemContainer
              isPin={isPin}
              onChange={props.onPinMessage} />
          </Box>
        </Paper>
      </Box>
      <Box 
        className={classes.starItem}
      >
        {starDisplayItem(props.message.starLevelNum)}
      </Box>
    </Box>
  );
};

export default MessageButtonsPart;