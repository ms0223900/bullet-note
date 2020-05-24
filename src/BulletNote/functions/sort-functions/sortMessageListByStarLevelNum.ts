import { MessageList, SortRule, MessageItem } from "BulletNote/types";

interface seperatedMessageListByStar {
  starMessageList: MessageList
  notStarMessageList: MessageList
}

export const sortMessageListByStarLevelNumSortFn = (sortRule: SortRule) => (prev: MessageItem, next: MessageItem) => {
  const prevStarNum = prev.message.starLevelNum || 0;
  const nextStarNum = next.message.starLevelNum || 0;

  if(prevStarNum > nextStarNum) {
    return sortRule === 'asc' ? -1 : 1;
  }
  else if(prevStarNum < nextStarNum) {
    return sortRule === 'asc' ? 1 : -1;
  }
  return 0;
};

const sortMessageListByStarLevelNum = (messageList: MessageList) => (sortRule: SortRule): MessageList => {
  let res: MessageList = [];

  res = messageList.sort(sortMessageListByStarLevelNumSortFn(sortRule));

  return res;
};

export const sepMessageListByStarLevelNum = (messageList: MessageList): seperatedMessageListByStar => {
  let res: seperatedMessageListByStar = {
    starMessageList: [],
    notStarMessageList: []
  };

  res.notStarMessageList = messageList.filter(m => {
    return typeof m.message.starLevelNum !== 'number' || m.message.starLevelNum <= 0;
  });

  res.starMessageList = messageList.filter(m => {
    return typeof m.message.starLevelNum === 'number' && 
    m.message.starLevelNum > 0;
  });
  res.starMessageList = sortMessageListByStarLevelNum(res.starMessageList)('asc');

  return res;
};

export default sortMessageListByStarLevelNum;