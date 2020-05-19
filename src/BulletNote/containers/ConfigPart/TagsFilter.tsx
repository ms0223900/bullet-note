import React, { useState, useCallback, useEffect } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import TagList from 'BulletNote/components/InputPart/TagList';
import { TagsFilterProps } from './types';
import useSelectorSelect from 'lib/customHooks/useSelectorSelect';
import { MapStateToProps, MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import getTagsFromMessageList from 'BulletNote/functions/getTagsFromMessageList';
import { connectCtx } from 'react-function-helpers';
import RemoveTagItem from 'BulletNote/components/ConfigPart/RemoveTagItem';
import { setFilterTags } from 'BulletNote/actions/config-actions';
import { dueDateRegExp } from 'BulletNote/functions/DueDateHandler';

const defaultSelect = 'Select Tag';

export const divideTagList = (tags: string[]): string[][] => {
  let res: string[][] = [];
  res = [[], []];

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const isDueDataTag = tag.match(dueDateRegExp);
    if(isDueDataTag) {
      res[1] = [
        ...res[1],
        tag
      ];
    } 
    else {
      res[0] = [
        ...res[0],
        tag
      ];
    }
  }

  return res;
};

const TagsFilter = (props: TagsFilterProps) => {
  const {
    initSelectedFilterTags,
    tags,
    setTagsToCtx,
  } = props;
  const dividedTags = divideTagList(tags);

  const [selectedTags, setSelectedTags] = useState<string[]>(initSelectedFilterTags);

  const handleAddSelectedTag = useCallback((tag: string) => {
    const isHaveTag = selectedTags.find(t => t === tag);
    if(isHaveTag || !tag) {
      return; 
    }
    setSelectedTags(s => {
      const newTags = [
        ...s,
        tag,
      ];
      setTagsToCtx(newTags);
      return newTags;
    });
  }, [selectedTags, setTagsToCtx]);

  const {
    values,
    handleSelect,
    handleResetSelect,
  } = useSelectorSelect({
    'tagList': '',
  }, (values) => handleAddSelectedTag(values.tagList));

  const handleRamoveSelectedTag = useCallback((tag: string) => {
    return () => {
      const newTags = selectedTags.filter(s => s !== tag);
      setSelectedTags(newTags);
      setTagsToCtx(newTags);
      handleResetSelect('tagList');
    };
  }, [handleResetSelect, selectedTags, setTagsToCtx]);

  useEffect(() => {
    // setTagsToCtx(selectedTags);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags.length]);

  return (
    <Box>
      <Typography>{'Select Filter Tags'}</Typography>
      <Box
        paddingBottom={1}
      >
        {selectedTags.map((s, i) => (
          <RemoveTagItem
            key={s}
            tag={s}
            onClick={handleRamoveSelectedTag(s)}
          />
        ))}
      </Box>
      {dividedTags.map((t, i) => {
        return (
          <TagList 
            label={defaultSelect}
            tags={t}
            tagValue={values['tagList']}
            onChangeSelect={handleSelect('tagList')}
          />
        );
      })}
    </Box>
  );
};

interface OwnProps {}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, {
  tags: string[],
  initSelectedFilterTags: string[]
}> = (state) => {
  return ({
    tags: getTagsFromMessageList(state.messageList),
    initSelectedFilterTags: state.bulletNoteConfig.selectedFilterTags,
  });
};

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  setTagsToCtx: (tags: string[]) => any
}> = (dispatch) => {
  return ({
    setTagsToCtx: (tags) => {
      const action = setFilterTags(tags);
      dispatch(action);
    }
  });
};

const TagsFilterWithCtx = connectCtx(ContextStore)(mapStateToProps, mapDispatchToProps)(TagsFilter);

export default TagsFilterWithCtx;