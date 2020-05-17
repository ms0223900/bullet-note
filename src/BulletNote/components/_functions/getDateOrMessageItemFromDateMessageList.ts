import { MessageList, MessageItem, NoteBlockItem } from "BulletNote/types";
import HandleMessageList from "BulletNote/functions/handleMessageListToMessageWithDateList";

export type ComponentType = 'date' | 'message-item'
export type Component = MessageItem | (Date | string)
interface DateComponent {
  type: 'date'
  component: Date | string
}
interface MessageItemComponent {
  type: 'message-item'
  component: MessageItem
}

export type WholeNoteBlockComponent = DateComponent | MessageItemComponent
export type WholeNoteBlockComponentList = WholeNoteBlockComponent[]

export const getSingleDateOrMessageItem = (noteBlockItem: NoteBlockItem) => {
  const {
    date,
    messageList,
  } = noteBlockItem;

  const dateComponent: DateComponent = {
    type: 'date',
    component: date,
  };
  
  const messageItemComponents: MessageItemComponent[] = messageList.map(m => ({
    type: 'message-item',
    component: m,
  }));

  return ({
    dateComponent,
    messageItemComponents,
  });
};

function getDateOrMessageItemFromDateMessageList(messageList: MessageList) {
  let res: WholeNoteBlockComponentList = [];

  const handledDateMessageList = HandleMessageList.convertToMessageWithDateList(messageList);

  for (let i = 0; i < handledDateMessageList.length; i++) {
    const dateMessageItem = handledDateMessageList[i];
    const {
      dateComponent,
      messageItemComponents,
    } = getSingleDateOrMessageItem(dateMessageItem);

    res = [
      ...res,
      dateComponent,
      ...messageItemComponents,
    ];
  }
  
  return res;
}

export default getDateOrMessageItemFromDateMessageList;