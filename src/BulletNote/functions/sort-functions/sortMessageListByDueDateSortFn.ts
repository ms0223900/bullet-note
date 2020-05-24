import { MessageItem, SortRule, MessageList } from "BulletNote/types";
import DueDateHandler from "../Handlers/DueDateHandler";

const defaultFutureDate = new Date('2100/01/01');

const sortMessageListByDueDateSortFn = (sortRule: SortRule) => (prev: MessageItem, next: MessageItem) => {
  let res = 0;

  const prevDueDate = DueDateHandler.getMessageItemDueDate(prev.message.tagList) || defaultFutureDate;
  const nextDueDate = DueDateHandler.getMessageItemDueDate(next.message.tagList) || defaultFutureDate;

  const prevDueDateTime = prevDueDate.getTime();
  const nextDueDateTime = nextDueDate.getTime();

  console.log(prevDueDateTime, nextDueDateTime);
  if(prevDueDateTime > nextDueDateTime) {
    res = sortRule === 'asc' ? -1 : 1;
  }
  else {
    res = sortRule === 'asc' ? 1 : -1;
  }

  return res;
};

// function sortMessageListByDueDate(messageList: MessageList) {
//   return (sortRule: SortRule): MessageList => {

//   }
// }

export default sortMessageListByDueDateSortFn;