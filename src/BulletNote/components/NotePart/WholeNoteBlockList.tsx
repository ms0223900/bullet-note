import React from 'react';
import { Box, Typography, RootRef } from '@material-ui/core';
import { WholeNoteBlockListProps } from './types';
import WholeNoteBlockItemContainerWithCtx from 'BulletNote/containers/NotePart/WholeNoteBlockItemContainer';
import MoveToBottomWrapper from '../wrappers/MoveToBottomWrapper';
import useNotePartStyles from 'BulletNote/styles/stylesObj/useNotePartStyles';
import WholeNoteBlockHandler from 'BulletNote/functions/Handlers/WholeNoteBlockHandler';

const WholeNoteBlockList = (props: WholeNoteBlockListProps) => {
  const {
    searchingText,
    scrollUpdateStates,
    messageList,
    tagList,
  } = props;

  const {
    outerRef,
    domRef,
    handleScroll,
    startEndIndex,
  } = scrollUpdateStates;

  const classes = useNotePartStyles();

  if(tagList.length === 0) {
    return (
      <Typography>
        {'No Selected Tag yet :)'}
      </Typography>
    );
  }

  const tagListData = WholeNoteBlockHandler.getNoteBlockItemTagList(messageList, tagList)({
    searchText: searchingText,
  });

  return (
    <RootRef
      rootRef={outerRef}
    >
      <MoveToBottomWrapper
        className={classes.root}
        onScroll={handleScroll}
        scrollToBottomDeps={[messageList.length]}
      >
        <RootRef
          rootRef={domRef}
        >
          <Box>
            {tagListData.tagList.map((t) => {
              if(t.isShow) {
                
                return (
                  <WholeNoteBlockItemContainerWithCtx  
                    key={t.tagName}
                    startEndIndex={startEndIndex}
                    {...tagListData.tagNoteBlockObj[t.tagName]}
                  />
                );
              }
              return null;
            })}
          </Box>
        </RootRef>
      </MoveToBottomWrapper>
    </RootRef>
  );
};

export default WholeNoteBlockList;