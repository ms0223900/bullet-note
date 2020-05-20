import React from 'react';
import { Box, makeStyles, Paper } from '@material-ui/core';
import StarItemContainer from 'BulletNote/containers/NotePart/StarItemContainer';
import PinItemContainer from 'BulletNote/containers/NotePart/PinItemContainer';
import MessageItemButtons from '../MessageItemButtons';
import { MessageButtonsPartProps } from './types';
import { MoreHoriz, Star } from '@material-ui/icons';
import StarLevelContainer from 'BulletNote/containers/CommonComponents/StarLevelContainer';
import { otherColors } from 'BulletNote/theme/theme';
import useToggle from 'BulletNote/functions/useToggle';
import ClickBackground from '../CommonComponents/ClickBackground';

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

  buttonsPaperPart: {
    position: 'absolute',
    top: -70,
    right: 0,
    width: buttonPartWidth,
  },

  morePart: {
    position: 'relative',
    zIndex: 100,
    // cursor: 'pointer',
    // opacity: 0.8,
    // '&:hover > div': {
    //   display: 'flex',
    // }
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

export const ButtonsPaperPart = (props: MessageButtonsPartProps) => {
  const classes = useStyles();
  const {
    starLevelNum,
    isPin,
  } = props.message;

  return (
    <Box
      className={classes.buttonsPaperPart}
    >
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
  );
};

const MessageButtonsPart = (props: MessageButtonsPartProps) => {
  const classes = useStyles();
  const {
    message, 
  } = props;

  const {
    toggle,
    handleToggle,
  } = useToggle(false);

  return (
    <Box
      position={'relative'}
      display={'flex'} 
      alignItems={'center'} 
    >
      <Box
        className={classes.morePart}
      >
        <Box
          onClick={handleToggle}
          style={{
            cursor: 'pointer',
          }}
        >
          <MoreHoriz />
        </Box>
        {toggle && (
          <>
            <ButtonsPaperPart 
              {...props}
            />
            <ClickBackground 
              onClick={handleToggle}
            />
          </>
        )}
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