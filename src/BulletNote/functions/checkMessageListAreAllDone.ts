import { MessageList } from "BulletNote/types";
import checkMessageItemIsDone from "./checkMessageItemIsDone";

const checkAllAreTrue = (arr: boolean[]) => {
  if(arr.includes(false)) {
    return false;
  }
  return true;
};

function checkMessageListAreAllDone(messageList: MessageList) {
  const doneList = messageList.map(m => checkMessageItemIsDone(m));
  const isAllDone = checkAllAreTrue(doneList);
  return isAllDone;
}

export default checkMessageListAreAllDone;