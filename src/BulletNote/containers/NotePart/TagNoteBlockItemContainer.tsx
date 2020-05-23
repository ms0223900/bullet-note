import React from 'react';
import TagNoteBlockItem from 'BulletNote/components/TagNoteBlockItem';
import { TagNoteBlockItemContainerProps } from '../types';
import useToggle from 'lib/customHooks/useToggle';

const TagNoteBlockItemContainer = (props: TagNoteBlockItemContainerProps) => {
  const {
    toggle,
    handleToggle,
  } = useToggle(true);
  
  return (
    <TagNoteBlockItem
      {...props} 
      toggleShowMessagesFn={handleToggle}
      isShowMessages={toggle}
    />
  );
};

export default TagNoteBlockItemContainer;