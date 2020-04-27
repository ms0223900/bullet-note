import React, { useState, useCallback } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import TagList from 'BulletNote/components/InputPart/TagList';
import { TagsFilterProps } from './types';
import useSelectorSelect from 'lib/customHooks/useSelectorSelect';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import getTagsFromMessageList from 'BulletNote/functions/getTagsFromMessageList';
import { connectCtx } from 'react-function-helpers';
import RemoveTagItem from 'BulletNote/components/ConfigPart/RemoveTagItem';

const defaultSelect = 'Select Tag';

const TagsFilter = (props: TagsFilterProps) => {
  const {
    tags
  } = props;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleAddSelectedTag = useCallback((tag: string) => {
    const isHaveTag = selectedTags.find(t => t === tag);
    if(isHaveTag || !tag) {
      return; 
    }
    setSelectedTags(s => [
      ...s,
      tag,
    ]);
  }, [selectedTags]);

  const {
    values,
    handleSelect,
    handleResetSelect,
  } = useSelectorSelect({
    'tagList': '',
  }, (values) => handleAddSelectedTag(values.tagList));

  const handleRamoveSelectedTag = useCallback((tag: string) => {
    return () => {
      setSelectedTags(s => s.filter(s => s !== tag));
      handleResetSelect('tagList');
    };
  }, [handleResetSelect]);

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
      <TagList 
        label={defaultSelect}
        tags={tags}
        tagValue={values['tagList']}
        onChangeSelect={handleSelect('tagList')}
      />
    </Box>
  );
};

interface OwnProps {}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, {
  tags: string[]
}> = (state) => {
  return ({
    tags: getTagsFromMessageList(state.messageList)
  });
};

//mapDispatch to ctx

const TagsFilterWithCtx = connectCtx(ContextStore)(mapStateToProps)(TagsFilter);

export default TagsFilterWithCtx;