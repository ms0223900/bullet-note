import React from 'react';
import { Box, Typography, RootRef } from '@material-ui/core';
import { WholeNoteBlockListProps } from './types';
import { getNoteBlockItemTagList } from '../NoteBlockItem';
import WholeNoteBlockItemContainerWithCtx from 'BulletNote/containers/NotePart/WholeNoteBlockItemContainer';
import MoveToBottomWrapper from '../wrappers/MoveToBottomWrapper';
import useNotePartStyles from 'BulletNote/styles/stylesObj/useNotePartStyles';
import { MessageList, MESSAGE_TYPE } from 'BulletNote/types';

const WholeNoteBlockList = (props: WholeNoteBlockListProps) => {
  const {
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

  const getDynamicMessageList = (useDynamicRendering=process.env.REACT_APP_USE_DYNAMIC_RENDERING) => (messageList: MessageList) => {
    if(!useDynamicRendering) {
      return messageList;
    }

    let res: MessageList = [];

    for (let i = 0; i < messageList.length; i++) {
      const messageItem = messageList[i];
      const isInRenderRange = i >= startEndIndex[0] && i <= startEndIndex[1];
      if(isInRenderRange) {
        res[i] = messageItem;
      } else {
        res[i] = {
          ...messageItem,
          type: MESSAGE_TYPE.EMPTY,
        };
      }
    }

    return res;
  };

  const tagListData = getNoteBlockItemTagList(messageList, tagList);

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
                const messageList = tagListData.tagNoteBlockObj[t.tagName].messageList;
                // const dynamicMessageList = getDynamicMessageList("true")(messageList);
                // console.log(dynamicMessageList);
                
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