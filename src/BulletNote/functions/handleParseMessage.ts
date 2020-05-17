import { MESSAGE_TYPE, TagItem, BasicMessage, TodoMessageStatus, MessageItem, SingleRawMessageFromDB, StarLevelNum } from "../types";
import { weekTargetTag } from 'BulletNote/functions/getTagsFromMessageList';
import WeekDatesHandler from "./WeekDatesHandler";

type AccOrDec = 'acc' | 'dec'

class HandleParseMessage {
  static todoReg = /(\[\]\s)?/
  static reviewReg = /(\*(\s)?)+([\u4E00-\u9FFF]|\w)+/g
  static removeReviewPresetReg = /(\*(\s))/g
  static tagReg = /#(\S)+(\s)?/g
  static defaultTag: TagItem = {
    id: 'notDefinedTag',
    name: '#未分類'
  }

  static sortByDateFn(accOrDec: AccOrDec) {
    return (prevDate?: Date | string, nextDate?: Date | string) => {
      if(!prevDate || !nextDate) {
        return 0;
      }
      const prev = (new Date(prevDate)).getTime();
      const next = (new Date(nextDate)).getTime();
      if(next - prev > 0) {
        return accOrDec === 'acc' ? -1 : 1;
      } 
      return accOrDec === 'acc' ? 1 : -1;
    };
  }
  static sortMessageListByDateFn(accOrDec: AccOrDec) {
    return (prev: MessageItem, next: MessageItem) => {
      const res = this.sortByDateFn(accOrDec)(prev.message.createdAt, next.message.createdAt);
      return res;
    };
  }

  static checkIsWeekTargetMessage(tagList: TagItem[]) {
    const tagStrList = tagList.map(t => t.id);
    const isIncludesWeekTargetTag = tagStrList.includes(weekTargetTag);
    return isIncludesWeekTargetTag;
  }

  static removeSpaceInStr(str: string) {
    return str.replace(/\s/g, '');
  }

  static makeBasicMessage(messageParams: {
    id: string, 
    content: string, 
    tagList: TagItem[], 
    rawMessage: string
    createdAt?: Date | string,
    starLevelNum?: StarLevelNum,
    isPin?: boolean,
  }): BasicMessage {
    const {
      tagList,
      createdAt,
    } = messageParams;
    
    let handledTagList = tagList;
    const createdAtTime = createdAt ? new Date(createdAt) : new Date();
    if(tagList.length === 0) {
      handledTagList = [this.defaultTag];
    }

    return ({
      ...messageParams,
      tagList: handledTagList,
      createdAt: createdAtTime,
      dateTagList: [],
    });
  }

  static makeTodoStatus(todoMessageStatus: TodoMessageStatus): TodoMessageStatus {
    return ({
      ...todoMessageStatus
    });
  }

  static getTagItem(_tagName: string): TagItem {
    const tagName = this.removeSpaceInStr(_tagName);
    return ({
      id: tagName,
      name: tagName,
    });
  }

  static getTagListFromRawMessage(rawMessage: string): TagItem[] {
    const matchedRes = rawMessage.match(this.tagReg);
    if(!!matchedRes) {
      return matchedRes.map(r => this.getTagItem(r));
    }
    return [];
  }

  static getMessageType(rawMessage: string) {
    const isTodoType = rawMessage.match(this.todoReg);
    const isReviewType = rawMessage.match(this.reviewReg);
    // console.log(isTodoType, isReviewType);

    if(isReviewType) {
      return MESSAGE_TYPE.DEFAULT;
    }

    if(isTodoType) {
      return MESSAGE_TYPE.TODO;
    }
    // else if(isReviewType) {
    //   return MESSAGE_TYPE.REVIEW;
    // }
    // return MESSAGE_TYPE.DEFAULT; 
  }

  static getContent(rawMessage: string): string {
    let res = rawMessage;
    res = res.replace(this.tagReg, '');
    res = res.replace(this.todoReg, '');
    res = res.replace(this.removeReviewPresetReg, '');
    return res;
  }

  static convertRawMessageToMessageItem(
    singleRawMessageFromDB: SingleRawMessageFromDB
  ): MessageItem {
    const {
      isDone,
      isPin,
      rawMessage,
    } = singleRawMessageFromDB;
    let createdAt = singleRawMessageFromDB.createdAt;

    const messageType = this.getMessageType(rawMessage);
    const tagList = this.getTagListFromRawMessage(rawMessage);
    const content = this.getContent(rawMessage);

    const message = this.makeBasicMessage({
      ...singleRawMessageFromDB,
      isPin,
      tagList,
      content,
      createdAt,
    });
    
    const status = this.makeTodoStatus({
      name: '',
      isDone: !!isDone,
    });

    switch (messageType) {
    case MESSAGE_TYPE.TODO: {
      return ({
        type: MESSAGE_TYPE.TODO,
        status,
        message,
      });
    }
    default:
      return ({
        type: MESSAGE_TYPE.DEFAULT,
        status,
        message,
      });
    }
  }

  static handleMessageItemWithWeekTarget(_messageItem: MessageItem) {
    let messageItem = _messageItem;
    let createdAt = _messageItem.message.createdAt;

    const isWeekTargetMessage = this.checkIsWeekTargetMessage(_messageItem.message.tagList);
    if(isWeekTargetMessage) {
      createdAt = WeekDatesHandler.getTodayThisWeekSunday();
    }
    const res: MessageItem = {
      ...messageItem,
      message: {
        ...messageItem.message,
        createdAt,
      }
    };
    return res;
  }
}

export default HandleParseMessage;