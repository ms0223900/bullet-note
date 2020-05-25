import { MessageList } from "BulletNote/types";
import removeListInList from "lib/removeListInList";
import { defaultTags } from "BulletNote/config";

const getTagsFromMessageList = (messageList: MessageList): string[] => {
  let tags: string[] = [];

  for (let i = 0; i < messageList.length; i++) {
    const singleMessage = messageList[i];
    const tagsInSingleMessage = (singleMessage.message.tagList).map(t => t.name);
    
    tags = [
      ...tags,
      ...tagsInSingleMessage,
    ];
  }
  tags = [...new Set(tags)];
  tags = removeListInList(tags, defaultTags);
  
  tags = [
    ...tags,
    ...defaultTags,
  ];

  return tags;
};

export default getTagsFromMessageList;