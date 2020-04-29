import { SingleRawMessageFromDB } from "BulletNote/types";

const stringifySingleMessage = (singleMesssage: SingleRawMessageFromDB) => {
  return `${singleMesssage.id}${singleMesssage.isDone}${singleMesssage.isPin}${singleMesssage.isStared}${singleMesssage.rawMessage}${singleMesssage.createdAt}`;
};

export const stringifyMessageList = (messages: SingleRawMessageFromDB[]) => (
  messages.map(m => stringifySingleMessage(m)).join('')
);

export default stringifySingleMessage;