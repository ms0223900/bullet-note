import { MessageList, TagNoteBlockList, TagNoteBlockItem, MessageItem, TagNoteBlockObj } from "../../types";
import DueDateHandler from "./DueDateHandler";
import checkMessageItemIsDone from "../checkMessageItemIsDone";
import { BulletNoteState, BulletNoteSetting } from "BulletNote/constants/context";
import TextHighLightHandler from "./TextHighLightHandler";
import SearchMatchHandler from "./SearchMatchHandler";

export interface FilterMessageListByDueDateUniqueTagParams {
  messageList: MessageList,
  isShowOverDueMessages: BulletNoteSetting['isShowOverDueMessages']
}

class HandleTagSortMessage {
  static checkNewStrIsInStrList(strList: string[], newStr: string) {
    return strList.includes(newStr);
  }

  static checkNewStrListIsInStrList(strList: string[], newStrList: string[]) {
    if(newStrList.length === 0) {
      return true;
    }
    for (let i = 0; i < newStrList.length; i++) {
      const str = newStrList[i];
      const isInList = this.checkNewStrIsInStrList(strList, str);
      if(isInList) {
        return true;
      };
    }
    return false;
  }

  static addNewStrToStrList(strList: string[], newStr: string) {
    const isIncludes = this.checkNewStrIsInStrList(strList, newStr);
    if(isIncludes) {
      return strList;
    }
    return [
      ...strList,
      newStr,
    ];
  }

  static addNewStrListToStrList(strList: string[], newStrList: string[]) {
    let res = strList;
    for (let i = 0; i < newStrList.length; i++) {
      const str = newStrList[i];
      res = this.addNewStrToStrList(res, str);
    }
    return res;
  }

  static getTagNamesFromMessage(singleMessage: MessageItem) {
    return singleMessage.message.tagList.map(
      t => t.name
    );
  }

  static getTagNoteBlockObj(_messageList: MessageList) {
    let tags: string[] = [];
    let tagNoteBlockObj: TagNoteBlockObj = {};
    
    for (let i = 0; i < _messageList.length; i++) {
      const singleMessage = _messageList[i];
      const singleMessageTags = this.getTagNamesFromMessage(singleMessage);
      tags = this.addNewStrListToStrList(tags, singleMessageTags);
      const isNewTagsInTags = this.checkNewStrListIsInStrList(tags, singleMessageTags);

      if(singleMessageTags.length > 0) {
        const newTag = singleMessageTags[0];

        if(tagNoteBlockObj[newTag]) {
          tagNoteBlockObj[newTag] = {
            ...tagNoteBlockObj[newTag],
            messageList: [
              ...tagNoteBlockObj[newTag].messageList,
              singleMessage,
            ]
          };
        } else {
          tagNoteBlockObj[newTag] = {
            tagTitle: newTag,
            messageList: [
              singleMessage,
            ]
          };
        }
      }
    }
    return tagNoteBlockObj;
  }

  static filterTagsBySelectedFilterTags(tags: string[], selectedFilterTags: string[]) {
    if(selectedFilterTags.length === 0) {
      return tags;
    }
    const res = tags.filter(tag => {
      return this.checkNewStrIsInStrList(selectedFilterTags, tag);
    });
    return res;
  }

  static filterMessageListByDueDateUniqueTag({
    messageList,
    isShowOverDueMessages
  }: FilterMessageListByDueDateUniqueTagParams) {
    let res: MessageList = [];

    messageList.forEach((messageItem) => {
      const dueDateIsInRange = 
        DueDateHandler.checkMessageItemHaveDueDateAndIsInRange(messageItem.message.tagList, isShowOverDueMessages);
      const messageIsNotDone = !checkMessageItemIsDone(messageItem);
      if(dueDateIsInRange && messageIsNotDone) {
        res = [
          ...res,
          messageItem
        ];
      }
    });

    return res;
  }

  static checkMessageContentIsMatchedSearchText(content: string, searchText: string) {
    const matchedRes = new SearchMatchHandler({
      text: content,
      searchText,
    });
    const res = matchedRes.getSearchAllMatched();
    if(res) {
      console.log(matchedRes.getSearchRes());
    }
    return res;
  }

  static filterMessageListSearching(_messageList: MessageList) {
    return (searchText: BulletNoteState['bulletNoteConfig']['searchingText']) => {
      let res: MessageList = [];

      if(searchText === '' || typeof searchText === 'undefined') {
        res = [];
      }
      else {
        res = _messageList.filter(m => {
          return this.checkMessageContentIsMatchedSearchText(m.message.content, String(searchText));
        });
      }

      return res;
    };
  }
}

export default HandleTagSortMessage;