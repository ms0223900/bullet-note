import { MessageList, SingleRawMessageFromDB, MESSAGE_TYPE } from "../types";

const messageListLS = 'messageListLS';
const checkLocalDataIsSameWithOnline = 'checkLocalWithOnline';

class HandleDataInLocalStorage {
  static convertMessageListToRawMessageList(messageList: MessageList): SingleRawMessageFromDB[] {
    return messageList.map(m => {
      const isDone = m.type === MESSAGE_TYPE.TODO ? !!m.status.isDone : undefined;
      const starLevelNum = typeof m.message.starLevelNum === 'number' ? m.message.starLevelNum : 0;
      
      return ({
        id: m.message.id,
        isDone,
        rawMessage: m.message.rawMessage,
        createdAt: new Date(m.message.createdAt),
        starLevelNum,
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

  static setDataFromRawData(rawMessageList: SingleRawMessageFromDB[]) {
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

  static initCheckLocalWithOnlineLS() {
    localStorage.setItem(checkLocalDataIsSameWithOnline, JSON.stringify(false));
  }
  static getCheckLocalWithOnlineLS() {
    const res = localStorage.getItem(checkLocalDataIsSameWithOnline);
    if(res) {
      return JSON.parse(res);
    }
    return false;
  }
  static setCheckLocalWithOnlineLS(isSame: boolean) {
    localStorage.setItem(checkLocalDataIsSameWithOnline, JSON.stringify(isSame));
  }
}

export default HandleDataInLocalStorage;