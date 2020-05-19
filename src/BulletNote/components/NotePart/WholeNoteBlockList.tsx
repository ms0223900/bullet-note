import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { WholeNoteBlockListProps } from './types';
import { getNoteBlockItemTagList } from '../NoteBlockItem';
import WholeNoteBlogItemContainerWithCtx from 'BulletNote/containers/NotePart/WholeNoteBlogItemContainer';
import MoveToBottomWrapper from '../wrappers/MoveToBottomWrapper';

const WholeNoteBlockList = (props: WholeNoteBlockListProps) => {
  const {
    messageList,
    tagList,
  } = props;

  if(tagList.length === 0) {
    return (
      <Typography>
        {'No Selected Tag yet :)'}
      </Typography>
    );
  }

  const tagListData = getNoteBlockItemTagList(messageList, tagList);

  return (
    <MoveToBottomWrapper>
      <Box>
        {tagListData.tagList.map((t) => {
          if(t.isShow) {
            return (
              <WholeNoteBlogItemContainerWithCtx  
                key={t.tagName}
                {...tagListData.tagNoteBlockObj[t.tagName]}
              />
            );
          }
          return null;
        })}
      </Box>
    </MoveToBottomWrapper>
  );
};

export default WholeNoteBlockList;