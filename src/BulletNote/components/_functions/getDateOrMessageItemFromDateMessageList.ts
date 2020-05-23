import { MessageList, MessageItem, NoteBlockItem } from "BulletNote/types";
import HandleMessageList from "BulletNote/functions/Handlers/handleMessageListToMessageWithDateList";
import checkMessageItemIsDone from "BulletNote/functions/checkMessageItemIsDone";
import checkMessageListAreAllDone from "BulletNote/functions/checkMessageListAreAllDone";

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
interface NullComponent {
  type: 'null'
  component: null
}

export type WholeNoteBlockComponent = DateComponent | MessageItemComponent | NullComponent
export type WholeNoteBlockComponentList = WholeNoteBlockComponent[]

export const getSingleDateOrMessageItem = (noteBlockItem: NoteBlockItem) => (isFilteringDone: boolean) => {
  const {
    date,
    messageList,
  } = noteBlockItem;
  const messageItemComponents: MessageItemComponent[] = messageList.map(m => ({
    type: 'message-item',
    component: m,
  }));

  let dateOrNullComponent: DateComponent | NullComponent = {
    type: 'date',
    component: date,
  };

  const isAllDone = checkMessageListAreAllDone(messageList);
  if(isFilteringDone && isAllDone) {
    dateOrNullComponent = {
      type: 'null',
      component: null,
    };
  }

  return ({
    dateOrNullComponent,
    messageItemComponents,
  });
};

function getDateOrMessageItemFromDateMessageList(messageList: MessageList) {
  return (isFilteringDone: boolean) => {
    let res: WholeNoteBlockComponentList = [];

    const handledDateMessageList = HandleMessageList.convertToMessageWithDateList(messageList);

    for (let i = 0; i < handledDateMessageList.length; i++) {
      const dateMessageItem = handledDateMessageList[i];
      const {
        dateOrNullComponent,
        messageItemComponents,
      } = getSingleDateOrMessageItem(dateMessageItem)(isFilteringDone);

      res = [
        ...res,
        dateOrNullComponent,
        ...messageItemComponents,
      ];
    }
  
    return res;
  };
}

export default getDateOrMessageItemFromDateMessageList;