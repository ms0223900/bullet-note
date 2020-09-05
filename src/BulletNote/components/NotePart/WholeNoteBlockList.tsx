import React, { memo, useMemo } from 'react';
import { Box, Typography, RootRef } from '@material-ui/core';
import { WholeNoteBlockListProps } from './types';
import WholeNoteBlockItemContainerWithCtx from 'BulletNote/containers/NotePart/WholeNoteBlockItemContainer';
import MoveToBottomWrapper from '../wrappers/MoveToBottomWrapper';
import useNotePartStyles from 'BulletNote/styles/stylesObj/useNotePartStyles';
import WholeNoteBlockHandler from 'BulletNote/functions/Handlers/WholeNoteBlockHandler';

const WholeNoteBlockList = (props: WholeNoteBlockListProps) => {
  const {
    isShowOverDueMessages,
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

  const tagListData = useMemo(() => WholeNoteBlockHandler.getNoteBlockItemTagList(messageList, tagList)({
    searchText: searchingText,
    isShowOverDueMessages,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [isShowOverDueMessages, JSON.stringify(messageList), searchingText, JSON.stringify(tagList)]);

  if(tagList.length === 0) {
    return (
      <Typography>
        {'No Selected Tag yet :)'}
      </Typography>
    );
  }

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

export default memo(WholeNoteBlockList);