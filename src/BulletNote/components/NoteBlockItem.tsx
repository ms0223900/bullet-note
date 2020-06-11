import React from 'react';
import { Box, makeStyles, Theme, Divider, Typography } from '@material-ui/core';
import { NoteBlockItemProps } from '../types';
import DateTitle from './DateTitle';
import TagNoteBlockItemContainerWithCtx from '../containers/NotePart/TagNoteBlockItemContainer';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';
import WholeNoteBlockHandler from 'BulletNote/functions/Handlers/WholeNoteBlockHandler';
import ToggleDisplayWrapper from './wrappers/ToggleDisplayWrapper';
import checkMessageListAreAllDone from 'BulletNote/functions/checkMessageListAreAllDone';

const useStyles = makeStyles<Theme, NoteBlockItemProps>(() => ({
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

  const tagListData = WholeNoteBlockHandler.getNoteBlockItemTagList(messageList, selectedFilterTags)({
    searchText: undefined,
    isShowOverDueMessages: true,
  });
  const isEmptyAfterFilteringDone = isFilteringDone && checkMessageListAreAllDone(messageList);

  const dateTitle = !tagListData.isEmptyAfterFiltered && (
    <Box paddingBottom={1}>
      <DateTitle
        date={date} />
    </Box>
  );
  const emptyMessage = isEmptyAfterFilteringDone ? (
    <Box paddingLeft={1}>
      <Typography variant={'body1'} color={'textSecondary'}>
        {'All Done :)'}
      </Typography>
    </Box>
  ) : null;

  return (
    <>
      <Box className={classes.root}>
        {dateTitle}
        {emptyMessage}
        {tagListData.tagList.map((tag, i) => {
          return (
            <ToggleDisplayWrapper
              isDisplay={tag.isShow}
            >
              <TagNoteBlockItemContainerWithCtx
                key={i}
                {...tagListData.tagNoteBlockObj[tag.tagName]}
                isFilteringDone={isFilteringDone}
              />
            </ToggleDisplayWrapper>
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