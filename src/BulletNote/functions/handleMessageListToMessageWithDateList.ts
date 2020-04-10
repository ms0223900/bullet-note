import { MessageList, NoteBlockItemProps } from "../types";

class HandleMessageList {
  static regDateToString(date: Date | string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  static checkTwoDateIsSame(date1: Date | string, date2: Date | string) {
    if(!date1 || !date2) {
      return false;
    }
    console.log(date1, date2);
    const date1Str = this.regDateToString(date1);
    const date2Str = this.regDateToString(date2);
    return date1Str === date2Str;
  }

  static convertToMessageWithDateList(_messageList: MessageList) : NoteBlockItemProps[] {
    let date: string | Date = '';
    let noteBlockIndex = -1;
    let messageWithDateList: NoteBlockItemProps[] = [{
      date,
      messageList: [],
    }];
    
    for (let i = 0; i < _messageList.length; i++) {
      const messageItem = _messageList[i];
      const createdAt = messageItem.message.createdAt;
      const dateIsSame = this.checkTwoDateIsSame(createdAt, date);
      if(!dateIsSame) {
        date = createdAt;
        noteBlockIndex += 1;
      }
      messageWithDateList[noteBlockIndex] = {
        date,
        messageList: [
          ...(
            messageWithDateList[noteBlockIndex] ? messageWithDateList[noteBlockIndex].messageList : []
          ),
          messageItem,
        ]
      };
    }
  
    return messageWithDateList;
  };
}

export default HandleMessageList;