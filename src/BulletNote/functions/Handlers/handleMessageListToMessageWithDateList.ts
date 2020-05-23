import { MessageList, NoteBlockItemProps, MessageListWithDate, NoteBlockItem } from "../../types";

class HandleMessageList {
  static getMillSecondsForDays(day: number) {
    return day * 24 * 60 * 60 * 1000;
  }
  static regDateToString(date: Date | string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  static checkTwoDateIsSame(date1: Date | string, date2: Date | string) {
    if(!date1 || !date2) {
      return false;
    }
    // console.log(date1, date2);
    const date1Str = this.regDateToString(date1);
    const date2Str = this.regDateToString(date2);
    return date1Str === date2Str;
  }

  static convertToMessageWithDateList(_messageList: MessageList) : NoteBlockItem[] {
    let date: string | Date = '';
    let noteBlockIndex = -1;
    let messageWithDateList: NoteBlockItem[] = [{
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

  static filterMessageListByDaysRange(messgeWithDateList: MessageListWithDate[], daysRange: number) {
    const todayTime = (new Date()).getTime();
    const daysRangeTime = this.getMillSecondsForDays(daysRange);

    const res = messgeWithDateList.filter(message => {
      const createdAtTime = (new Date(message.date)).getTime();
      if(todayTime - createdAtTime <= daysRangeTime) {
        return true;
      }
      return false;
    });

    return res;
  }

  static filterMessageListByTags(messgeWithDateList: MessageListWithDate[], tags: string[]) {
    const res = messgeWithDateList.map(mes => {
      return mes.messageList.filter(m => {
        const isMessageInTags = tags.find(tag => {
          return m.message.tagList[0].name === tag;
        });
        return isMessageInTags;
      });
    });
    
    return res;
  }
}

export default HandleMessageList;