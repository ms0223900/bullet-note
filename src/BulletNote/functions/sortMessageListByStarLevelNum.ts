import { MessageList } from "BulletNote/types";

interface seperatedMessageListByStar {
  starMessageList: MessageList
  notStarMessageList: MessageList
}

const sortMessageListByStarLevelNum = (messageList: MessageList): MessageList => {
  let res: MessageList = [];

  res = messageList.sort((prev, next) => {
    const prevStarNum = prev.message.starLevelNum || 0;
    const nextStarNum = next.message.starLevelNum || 0;

    if(prevStarNum > nextStarNum) {
      return -1;
    }
    else if(prevStarNum < nextStarNum) {
      return 1;
    }
    return 0;
  });

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
  res.starMessageList = sortMessageListByStarLevelNum(res.starMessageList);

  return res;
};

export default sortMessageListByStarLevelNum;