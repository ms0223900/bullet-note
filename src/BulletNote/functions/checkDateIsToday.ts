import HandleMessageList from "./handleMessageListToMessageWithDateList";

const checkDateIsToday = (date: Date | string) => {
  const res = HandleMessageList.checkTwoDateIsSame(new Date(), date);
  return res;
};

export default checkDateIsToday;