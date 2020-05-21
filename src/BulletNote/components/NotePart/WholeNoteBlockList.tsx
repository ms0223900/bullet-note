import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { WholeNoteBlockListProps } from './types';
import { getNoteBlockItemTagList } from '../NoteBlockItem';
import WholeNoteBlockItemContainerWithCtx from 'BulletNote/containers/NotePart/WholeNoteBlockItemContainer';
import MoveToBottomWrapper from '../wrappers/MoveToBottomWrapper';
import useNotePartStyles from 'BulletNote/styles/stylesObj/useNotePartStyles';

const WholeNoteBlockList = (props: WholeNoteBlockListProps) => {
  const {
    messageList,
    tagList,
  } = props;
  const classes = useNotePartStyles();

  if(tagList.length === 0) {
    return (
      <Typography>
        {'No Selected Tag yet :)'}
      </Typography>
    );
  }

  const tagListData = getNoteBlockItemTagList(messageList, tagList);

  return (
    <MoveToBottomWrapper
      className={classes.root}
      scrollToBottomDeps={[messageList.length]}
    >
      <Box>
        {tagListData.tagList.map((t) => {
          if(t.isShow) {
            return (
              <WholeNoteBlockItemContainerWithCtx  
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