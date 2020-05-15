import React, { useRef } from 'react';
import { Box, makeStyles, Theme, Divider } from '@material-ui/core';
import { NoteBlockItemProps, MessageList } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import DateTitle from './DateTitle';
import HandleTagSortMessage from '../functions/handleTagSortMessage';
import TagNoteBlockItem from './TagNoteBlockItem';
import TagNoteBlockItemContainerWithCtx from '../containers/NotePart/TagNoteBlockItemContainer';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';

export const getNoteBlockItemTagList = (messageList: MessageList, selectedFilterTags: string[]) => {
  const tagNoteBlockObj = HandleTagSortMessage.getTagNoteBlockObj(messageList);
  const tags = Object.keys(tagNoteBlockObj);

  const filteredTags = HandleTagSortMessage.filterTagsBySelectedFilterTags(tags, selectedFilterTags);
  const isEmptyAfterFiltered = filteredTags.length === 0;

  const tagList = tags.map((t, i) => ({
    tagName: t,
    isShow: HandleTagSortMessage.checkNewStrIsInStrList(filteredTags, t),
  }));

  const res = {
    isEmptyAfterFiltered,
    tagNoteBlockObj,
    tagList,
  };
  return res;
};

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
    isFilteringDone,
  } = props;
  const classes = useStyles(props);

  const tagListData = getNoteBlockItemTagList(messageList, selectedFilterTags);

  return (
    <>
      <Box className={classes.root}>
        {!tagListData.isEmptyAfterFiltered && (
          <Box paddingBottom={1}>
            <DateTitle
              date={date} />
          </Box>
        )}
        {tagListData.tagList.map((tag, i) => {
          return (
            <Box
              style={{
                display: tag.isShow ? 'block' : 'none',
              }}
            >
              <TagNoteBlockItemContainerWithCtx
                key={i}
                {...tagListData.tagNoteBlockObj[tag.tagName]}
                isFilteringDone={isFilteringDone}
              />
            </Box>
          );
        })}
      </Box>
      <Divider />
    </>
  );
};

interface OwnProps extends Omit<NoteBlockItemProps, 'selectedFilterTags' | 'isFilteringDone'> {

}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, {
  selectedFilterTags: NoteBlockItemProps['selectedFilterTags']
  isFilteringDone: boolean
}> = (state) => {
  return ({
    selectedFilterTags: state.bulletNoteConfig.selectedFilterTags,
    isFilteringDone: state.bulletNoteConfig.isFilteringDone,
  });
};


const NoteBlockItemWithCtx = connectCtx(ContextStore)(mapStateToProps)(NoteBlockItem);

export default NoteBlockItemWithCtx;