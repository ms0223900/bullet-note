import { MessageListWithDate, SingleMessageListWithDateSplitByWeek, WeekFromTo } from "BulletNote/types";
import WeekDatesHandler from "./WeekDatesHandler";

const defaultBeginingDate = new Date('1900/01/01');

const splitMessageListWithDataByWeek = (messageListWithDateList: MessageListWithDate[]): SingleMessageListWithDateSplitByWeek[] => {
  if(messageListWithDateList.length === 0) {
    return [];
  }

  const initMessageListWithDateSplitByWeek = (weekFromTo: WeekFromTo) => ({
    ...weekFromTo,
    messageListWithDateList: []
  });
  
  const firstDate = messageListWithDateList[0].date;
  let weekIndex = 0;
  let weekFromToNow: WeekFromTo = WeekDatesHandler.getTodayThisWeekFromTo(firstDate);
  let res: SingleMessageListWithDateSplitByWeek[] = [];
  res[0] = initMessageListWithDateSplitByWeek(weekFromToNow);

  for (let i = 0; i < messageListWithDateList.length; i++) {
    const messageListWithDate = messageListWithDateList[i];
    const today = new Date(messageListWithDate.date);
    const isTodayIsBiggerThanWeekToNow = WeekDatesHandler.checkNextDatesIsBigger(weekFromToNow.weekTo, today);

    if(isTodayIsBiggerThanWeekToNow) {
      //update thisWeekFromTo
      weekFromToNow = WeekDatesHandler.getTodayThisWeekFromTo(today);
      weekIndex += 1;
      //init arr
      res[weekIndex] = initMessageListWithDateSplitByWeek(weekFromToNow);
    }
    res[weekIndex] = {
      ...weekFromToNow,
      messageListWithDateList: [
        ...res[weekIndex].messageListWithDateList,
        messageListWithDate,
      ]
    };
  }

  return res;
};

export default splitMessageListWithDataByWeek;