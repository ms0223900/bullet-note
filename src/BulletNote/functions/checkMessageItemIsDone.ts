import { MessageItem, MESSAGE_TYPE } from "BulletNote/types";
import { Done } from "@material-ui/icons";

const checkMessageItemIsDone = (messageItem: MessageItem) => {
  const res = messageItem.type === MESSAGE_TYPE.TODO && messageItem.status.isDone === true;

  return res;
};

export default checkMessageItemIsDone;