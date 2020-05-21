import sortMessageListByStarLevelNum from "BulletNote/functions/sortMessageListByStarLevelNum";
import { MessageList, SortType, SortRule } from "BulletNote/types";

export interface SortOptions {
  sortType: SortType
  sortRule: SortRule
}

const sortMessageList = (options: SortOptions) => (messageList: MessageList) => {
  let res = messageList;
  
  if(options.sortType === 'star-num') {
    res = sortMessageListByStarLevelNum(messageList)(options.sortRule);
  }

  return res;
};

export default sortMessageList;