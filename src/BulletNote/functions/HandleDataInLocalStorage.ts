import { MessageList, SingleRawMessageFromDB, MESSAGE_TYPE } from "../types";

const messageListLS = 'messageListLS';

class HandleDataInLocalStorage {
  static convertMessageListToRawMessageList(messageList: MessageList): SingleRawMessageFromDB[] {
    return messageList.map(m => {
      let isDone = undefined;
      if(m.type === MESSAGE_TYPE.TODO) {
        isDone = m.status.isDone;
      }
      return ({
        id: m.message.id,
        isDone,
        rawMessage: m.message.rawMessage,
        createdAt: new Date(m.message.createdAt),
        isStared: m.message.isStared,
        isPin: m.message.isPin,
      });
    });
  }

  static setData(messageList: MessageList) {
    const rawMessageList = this.convertMessageListToRawMessageList(
      messageList,
    );
    const dataStr = JSON.stringify(rawMessageList);
    localStorage.setItem(messageListLS, dataStr);
  }

  static getData(): SingleRawMessageFromDB[] {
    const data = localStorage.getItem(messageListLS);
    if(data) {
      return JSON.parse(data);
    }
    return [];
  };
}

export default HandleDataInLocalStorage;