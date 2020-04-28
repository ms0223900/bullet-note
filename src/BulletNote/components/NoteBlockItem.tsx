import React, { useRef } from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { NoteBlockItemProps } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import DateTitle from './DateTitle';
import HandleTagSortMessage from '../functions/handleTagSortMessage';
import TagNoteBlockItem from './TagNoteBlockItem';
import TagNoteBlockItemContainerWithCtx from '../containers/NotePart/TagNoteBlockItemContainer';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';

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
    selectedFilterTags,
  } = props;
  const classes = useStyles(props);

  const tagNoteBlockObj = HandleTagSortMessage.getTagNoteBlockObj(messageList);
  const tags = Object.keys(tagNoteBlockObj);

  const filteredTags = HandleTagSortMessage.filterTagsBySelectedFilterTags(tags, selectedFilterTags);
  const isEmptyAfterFiltered = filteredTags.length === 0;
  console.log(filteredTags, tags, selectedFilterTags);

  return (
    <>
      <Box className={classes.root}>
        {!isEmptyAfterFiltered && (
          <Box paddingBottom={1}>
            <DateTitle
              date={date} />
          </Box>
        )}
        {tags.map((t, i) => {
          const isShow = HandleTagSortMessage.checkNewStrIsInStrList(filteredTags, t);
          return (
            <Box
              style={{
                display: isShow ? 'block' : 'none',
              }}
            >
              <TagNoteBlockItemContainerWithCtx
                key={i}
                {...tagNoteBlockObj[t]} />
            </Box>
          );
        })}
      </Box>
      {/* <hr /> */}
    </>
  );
};

interface OwnProps extends Omit<NoteBlockItemProps, 'selectedFilterTags'> {

}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, {
  selectedFilterTags: NoteBlockItemProps['selectedFilterTags']
}> = (state) => {
  return ({
    selectedFilterTags: state.bulletNoteConfig.selectedFilterTags,
  });
};


const NoteBlockItemWithCtx = connectCtx(ContextStore)(mapStateToProps)(NoteBlockItem);

export default NoteBlockItemWithCtx;