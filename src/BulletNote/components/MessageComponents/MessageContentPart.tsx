import React, { memo } from 'react';
import { Box, makeStyles, Grid } from '@material-ui/core';
import { MessageContentPartProps } from './types';
import DueDateHandler, { dueDateRegExp } from 'BulletNote/functions/Handlers/DueDateHandler';
import DueDateItemContainer from 'BulletNote/containers/CommonComponents/DueDateItemContainer';
import EditContentContainer from 'BulletNote/containers/MessageComponents/EditContentContainer';
import BulletTagList from '../BullteTagList';

const addZeroToSmallerThanTenNumber = (num: number) => (
  num < 10 ? `0${num}` : String(num)
);

export const regDateToString = (date: Date | string) => {
  if(typeof date === 'string') return date;
  const hour = addZeroToSmallerThanTenNumber(date.getHours());
  const min = addZeroToSmallerThanTenNumber(date.getMinutes());
  // return '';
  return `${hour}:${min}`;
};

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  contentPart: {
    fontSize: '1em',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
  },
  tagPart: {
    width: `${1/12 * 100}%`,
    [theme.breakpoints.down('xs')]: {
      width: 0,
      overflow: 'hidden',
    }
  },
  dueDatePart: {
    width: `${1/12 * 100}%`,
  }
}));

const MessageContentPart = (props: MessageContentPartProps) => {
  const {
    onChangeInput,
    message,
  } = props;
  const classes = useStyles();

  const {
    content,
    tagList,
  } = message;

  const dueDate = DueDateHandler.getMessageItemDueDate(tagList);
  const tagListWithoutDueDate = DueDateHandler.getTagListWithoutDueDateTag(tagList);
  
  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={11} sm={10}>
        <EditContentContainer
          {...props}
          content={content}
          onChange={onChangeInput}
        />
      </Grid>
      {dueDate && (
        <>
          <Grid item className={classes.tagPart}>
            <BulletTagList
              tagList={tagListWithoutDueDate} 
            />
          </Grid>
          <Grid item className={classes.dueDatePart}>
            <DueDateItemContainer 
              date={dueDate}
              dueType={'due-normal'}
            />
          </Grid>
        </>
      )}
      <Box 
        paddingLeft={1}
      >
        {/* <Typography variant={'body1'} color={'textSecondary'}>
            {regDateToString(createdAt)}
          </Typography> */}
          
      </Box>
    </Grid>
  );
};

export default memo(MessageContentPart);