import sortMessageListByStarLevelNum from "BulletNote/functions/sort-functions/sortMessageListByStarLevelNum";
import { MessageList, SortType, SortRule } from "BulletNote/types";
import HandleParseMessage from "BulletNote/functions/Handlers/handleParseMessage";
import sortMessageListByDueDateSortFn from "./sortMessageListByDueDateSortFn";

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
    case 'due-date':
      res = messageList.sort(
        sortMessageListByDueDateSortFn(options.sortRule)
      );
      break;
    default:
      res = messageList.sort(
        HandleParseMessage.sortMessageListByDateFn(options.sortRule)
      );
      break;
  }

  return res;
};

export default sortMessageList;