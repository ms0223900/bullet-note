import sortMessageListByStarLevelNum from "BulletNote/functions/sortMessageListByStarLevelNum";
import { MessageList, SortType, SortRule } from "BulletNote/types";
import HandleParseMessage from "BulletNote/functions/handleParseMessage";

export interface SortOptions {
  sortType: SortType
  sortRule: SortRule
}

const sortMessageList = (options: SortOptions) => (messageList: MessageList) => {
  let res = messageList;
  switch (options.sortType) {
    case 'star-num':
      res = sortMessageListByStarLevelNum(messageList)(options.sortRule);
      break;
    default:
      res = messageList.sort(HandleParseMessage.sortMessageListByDateFn(options.sortRule));
      break;
  }

  return res;
};

export default sortMessageList;