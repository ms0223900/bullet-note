import { MessageList } from "BulletNote/types";

const getTagsFromMessageList = (messageList: MessageList): string[] => {
  let tags: string[] = [];

  for (let i = 0; i < messageList.length; i++) {
    const singleMessage = messageList[i];
    tags = [
      ...tags,
      ...(singleMessage.message.tagList).map(t => t.name),
    ];
  }

  return [...new Set(tags)];
};

export default getTagsFromMessageList;