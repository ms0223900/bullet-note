import { TagNoteBlockObj, MessageList } from "BulletNote/types";
import HandleTagSortMessage from "./handleTagSortMessage";
import { dueDateUniqueTag, searchingTag } from "BulletNote/config";
import { BulletNoteState } from "BulletNote/constants/context";

export interface TagItemForNoteBlockItem {
  tagName: string
  isShow: boolean
}

export interface Options {
  searchText: BulletNoteState['bulletNoteConfig']['searchingText']
}

class WholeNoteBlockHandler {
  static getDueDateTagTagNoteBlockObj(messageList: MessageList) {
    const filteredMessageList = HandleTagSortMessage.filterMessageListByDueDateUniqueTag(messageList);
    const res = {
      [dueDateUniqueTag]: {
        tagTitle: dueDateUniqueTag,
        messageList: filteredMessageList,
      }
    };
    return res;
  }

  static getSearchResultTagNoteBlockObj(messageList: MessageList) {
    return (searchText: Options['searchText']) => {
      const filteredMessageList = HandleTagSortMessage.filterMessageListSearching(messageList)(searchText);

      const tagNoteBlockObj = {
        [searchingTag]: {
          tagTitle: searchingTag,
          messageList: filteredMessageList,
        }
      };
      const tagList = [{
        tagName: searchingTag,
        isShow: true,
      }];
      
      const res = ({
        tagNoteBlockObj,
        tagList,
      });
      return res;
    };
  }

  static getNormalTagNoteBlockObj(messageList: MessageList, selectedFilterTags: string[]) {
    const tagNoteBlockObj = HandleTagSortMessage.getTagNoteBlockObj(messageList);
    const tags = Object.keys(tagNoteBlockObj);

    const filteredTags = HandleTagSortMessage.filterTagsBySelectedFilterTags(tags, selectedFilterTags);
    const isEmptyAfterFiltered = filteredTags.length === 0;

    const tagList = tags.map((t) => ({
      tagName: t,
      isShow: HandleTagSortMessage.checkNewStrIsInStrList(filteredTags, t),
    }));

    return ({
      tagList,
      tagNoteBlockObj,
      isEmptyAfterFiltered,
    });
  }

  static getNoteBlockItemTagList(messageList: MessageList, selectedFilterTags: string[]) {
    return (options: Options) => {
      
      const isDueDateMessageList = selectedFilterTags.includes(dueDateUniqueTag);
      const isSearchingResult = selectedFilterTags.includes(searchingTag);

      let tagList: TagItemForNoteBlockItem[] = [];
      let isEmptyAfterFiltered = false;
      let tagNoteBlockObj: TagNoteBlockObj;

      if(isDueDateMessageList) {
        tagList = [{
          tagName: dueDateUniqueTag,
          isShow: true,
        }];
        tagNoteBlockObj = this.getDueDateTagTagNoteBlockObj(messageList);
      }
      else if(isSearchingResult) {
        const searchingResultRes = this.getSearchResultTagNoteBlockObj(messageList)(options.searchText);
        
        tagList = searchingResultRes.tagList;
        tagNoteBlockObj = searchingResultRes.tagNoteBlockObj;
      }
      else {
        const others = this.getNormalTagNoteBlockObj(messageList, selectedFilterTags);

        tagNoteBlockObj = others.tagNoteBlockObj;
        isEmptyAfterFiltered = others.isEmptyAfterFiltered;
        tagList = others.tagList;
      }

      const res = {
        isEmptyAfterFiltered,
        tagNoteBlockObj,
        tagList,
      };
      return res;
    };
  }
}

export default WholeNoteBlockHandler;