import sortMessageListByStarLevelNum from "BulletNote/functions/sort-functions/sortMessageListByStarLevelNum";
import { MessageList, SortType, SortRule } from "BulletNote/types";
import HandleParseMessage from "BulletNote/functions/Handlers/handleParseMessage";
import sortMessageListByDueDateSortFn from "./sortMessageListByDueDateSortFn";

export interface SortOptions {
  sortType: SortType
  sortRule: SortRule
}

const sortMessageList = (options: SortOptions) => (messageList: MessageList) => {
  let res = JSON.parse(JSON.stringify(messageList)) as MessageList;
  
  switch (options.sortType) {
    case 'star-num':
      res = sortMessageListByStarLevelNum(res)(options.sortRule);
      break;
    case 'due-date':
      res.sort(
        sortMessageListByDueDateSortFn(options.sortRule)
      );
      break;
    default:
      res.sort(
        HandleParseMessage.sortMessageListByDateFn(options.sortRule)
      );
      break;
  }

  return res;
};

export default sortMessageList;