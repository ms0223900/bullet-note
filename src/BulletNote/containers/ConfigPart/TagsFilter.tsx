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
import { dueDateRegExp } from 'BulletNote/functions/Handlers/DueDateHandler';
import divideTagStrList from 'BulletNote/functions/divideTagStrList';
import { FilterSelector } from 'ibus-common-components';

const defaultSelect = 'Choose Tags';

const TagsFilter = (props: TagsFilterProps) => {
  const {
    initSelectedFilterTags,
    tags,
    setTagsToCtx,
  } = props;
  const dividedTags = divideTagStrList(tags);

  const [selectedTags, setSelectedTags] = useState<string[]>(initSelectedFilterTags);

  const handleAddSelectedTag = useCallback((tag: string) => {
    const isHaveTag = selectedTags.find(t => t === tag);
    if(isHaveTag || !tag) {
      return; 
    }
    
    setSelectedTags(s => {
      let newTags = [
        ...s,
        tag,
      ];
      newTags = [...new Set(newTags)];
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
  }, 
  (values) => handleAddSelectedTag(values.tagList)
  );

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
    setSelectedTags(initSelectedFilterTags);
  }, [initSelectedFilterTags, initSelectedFilterTags.length]);

  const tagsKeys = Object.keys(dividedTags);
  const tagsOptions = dividedTags['normalTags'].map(t => ({
    text: t,
    value: t
  }));

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
      {tagsKeys
        .slice(0, 1)
        .map((t, i) => {
          return (
            <FilterSelector 
              key={i}
              defaultSelectedText={defaultSelect}
              options={tagsOptions}
              getSelectedOptionFn={(val) => handleAddSelectedTag(val.value)}
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