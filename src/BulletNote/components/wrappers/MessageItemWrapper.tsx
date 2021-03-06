import React, { memo } from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { MessageItemWrapperProps } from '../types';
import BasicMessageItem from '../BasicMessageItem';
import BasicMessageItemContainerWithCtx from 'BulletNote/containers/BasicMessageItemContainer';
import checkMessageShouldStandBy from 'BulletNote/functions/message-functions/checkMessageShouldStandBy';
import { otherColors } from 'BulletNote/theme/theme';

export const getBorderLeftStyle = (props: MessageItemWrapperProps) => {
  const isStarMessage = props.message.starLevelNum && props.message.starLevelNum > 0;
  const res = isStarMessage ? `4.5px solid ${otherColors.starPart}` : 'none';
  return res;
};

const useStyles = makeStyles<Theme, MessageItemWrapperProps>(theme => ({
  root: {
    // cursor: 'pointer',
    borderLeft: getBorderLeftStyle,
    opacity: props => checkMessageShouldStandBy(props.message.starLevelNum) ? 0.25 : 1,
    paddingBottom: 0,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(1.5),
      alignItems: 'start',
    },
    transition: '0.1s',
    '&:hover': {
      transition: '0.1s',
      opacity: 1,
      backgroundColor: '#eee',
    }
  }
}));


const MessageItemWrapper = (props: MessageItemWrapperProps) => {
  const classes = useStyles(props);

  return (
    <Box
      display={'flex'} 
      alignItems={'center'} 
      className={classes.root}
    >
      {props.children}
      <BasicMessageItemContainerWithCtx
        {...props} />
    </Box>
  );
};

export default memo(MessageItemWrapper);  