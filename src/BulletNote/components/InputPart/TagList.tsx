import React from 'react';
import { Box, Select, MenuItem } from '@material-ui/core';
import { TagListProps } from './types';

const TagList = (props: TagListProps) => {
  return (
    <Select
      id={'select-tags'}
      value={props.tagValue}
      onChange={props.onChangeSelect}
    >
      {props.tags.map((tag, i) => (
        <MenuItem key={i} value={tag}>{tag}</MenuItem>
      ))}
    </Select>
  );
};

export default TagList;