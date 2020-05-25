import React, { useRef } from 'react';
import { Box, makeStyles, Theme, Divider } from '@material-ui/core';
import { NoteBlockItemProps, MessageList, TagNoteBlockObj } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import DateTitle from './DateTitle';
import HandleTagSortMessage from '../functions/Handlers/handleTagSortMessage';
import TagNoteBlockItem from './TagNoteBlockItem';
import TagNoteBlockItemContainerWithCtx from '../containers/NotePart/TagNoteBlockItemContainer';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';
import { dueDateUniqueTag } from 'BulletNote/config';

export interface TagItemForNoteBlockItem {
  tagName: string
  isShow: boolean
}

export const getNoteBlockItemTagList = (messageList: MessageList, selectedFilterTags: string[]) => {
  let tagList: TagItemForNoteBlockItem[] = [];
  let isEmptyAfterFiltered = false;
  let tagNoteBlockObj: TagNoteBlockObj;

  if(selectedFilterTags.includes(dueDateUniqueTag)) {
    const filteredMessageList = HandleTagSortMessage.filterMessageListByDueDateUniqueTag(messageList);
    tagList = [{
      tagName: dueDateUniqueTag,
      isShow: true,
    }];
    tagNoteBlockObj = {
      [dueDateUniqueTag]: {
        tagTitle: dueDateUniqueTag,
        messageList: filteredMessageList,
      }
    };
  }
  else {
    tagNoteBlockObj = HandleTagSortMessage.getTagNoteBlockObj(messageList);
    const tags = Object.keys(tagNoteBlockObj);
  
    const filteredTags = HandleTagSortMessage.filterTagsBySelectedFilterTags(tags, selectedFilterTags);
    isEmptyAfterFiltered = filteredTags.length === 0;
  
    tagList = tags.map((t, i) => ({
      tagName: t,
      isShow: HandleTagSortMessage.checkNewStrIsInStrList(filteredTags, t),
    }));
  }

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