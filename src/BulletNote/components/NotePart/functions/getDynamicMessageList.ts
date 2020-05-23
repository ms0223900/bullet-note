import { MessageList, StartEndIndex, MESSAGE_TYPE } from "BulletNote/types";
import checkMessageItemIsDone from "BulletNote/functions/checkMessageItemIsDone";

export interface DynamicMessageOptions {
  messageList: MessageList
  startEndIndex?: StartEndIndex
  isFilteringDone?: boolean
}

const getDynamicMessageList = (useDynamicRendering=process.env.REACT_APP_USE_DYNAMIC_RENDERING) => ({
  messageList, startEndIndex, isFilteringDone
}: DynamicMessageOptions) => {
  if(!useDynamicRendering || !startEndIndex) {
    return messageList;
  }

  let res: MessageList = [];
  const isFirstTimeDynamicRendering = !messageList.find(m => m.type === MESSAGE_TYPE.EMPTY);
  const startIndex = startEndIndex[0];
  const endIndex = startEndIndex[1];

  const filteredMessageList = isFilteringDone ? 
    messageList : 
    messageList;

  for (let i = 0; i < filteredMessageList.length; i++) {
    const messageItem = filteredMessageList[i];
    const isInRenderRange = i >= startIndex && i <= endIndex;
    const isEmptyType = messageItem.type === MESSAGE_TYPE.EMPTY;

    // if(!isEmptyType && !isFirstTimeDynamicRendering) {
    //   break;
    // }
    if(isInRenderRange) {
      res[i] = messageItem;
    }
    else {
      res[i] = {
        ...messageItem,
        type: MESSAGE_TYPE.EMPTY,
      };
    }
  }

  return res;
};

export default getDynamicMessageList;