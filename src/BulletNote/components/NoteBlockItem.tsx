import React from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { NoteBlockItemProps } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import DateTitle from './DateTitle';
import HandleTagSortMessage from '../functions/handleTagSortMessage';
import TagNoteBlockItem from './TagNoteBlockItem';
import TagNoteBlockItemContainerWithCtx from '../containers/NotePart/TagNoteBlockItemContainer';

const useStyles = makeStyles<Theme, NoteBlockItemProps>(theme => ({
  root: {
    borderRadius: 4,
    borderColor: props => props.selected ? '#ddd' : 'transparent',
    borderWidth: 2,
    borderStyle: 'solid',
  }
}));

const NoteBlockItem = (props: NoteBlockItemProps) => {
  const {
    date,
    messageList,
  } = props;
  const classes = useStyles(props);

  const tagNoteBlockObj = HandleTagSortMessage.getTagNoteBlockObj(messageList);
  const tags = Object.keys(tagNoteBlockObj);
  
  return (
    <>
      <Box padding={0.5} paddingBottom={2} className={classes.root}>
        <Box paddingBottom={1}>
          <DateTitle
            date={date} />
        </Box>
        {tags.map((t, i) => (
          <TagNoteBlockItemContainerWithCtx
            key={i}
            {...tagNoteBlockObj[t]} />
        ))}
      </Box>
      {/* <hr /> */}
    </>
  );
};

export default NoteBlockItem;