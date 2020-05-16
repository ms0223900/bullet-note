import React from 'react';
import { Box } from '@material-ui/core';
import { WholeNoteBlockListProps } from './types';
import { getNoteBlockItemTagList } from '../NoteBlockItem';
import WholeNoteBlogItemContainerWithCtx from 'BulletNote/containers/NotePart/WholeNoteBlogItemContainer';

const WholeNoteBlockList = (props: WholeNoteBlockListProps) => {
  const {
    messageList,
    tagList,
  } = props;

  const tagListData = getNoteBlockItemTagList(messageList, tagList);

  return (
    <Box>
      {tagListData.tagList.map((t) => (
        <WholeNoteBlogItemContainerWithCtx  
          key={t.tagName}
          {...tagListData.tagNoteBlockObj[t.tagName]}
        />
      ))}
    </Box>
  );
};

export default WholeNoteBlockList;