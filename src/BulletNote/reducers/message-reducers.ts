import { BulletNoteState } from "../constants/context";
import InputPartActions from "../actions/message-actions";
import { BulletNoteActionTypes } from "../actions";
import HandleParseMessage from "../functions/handleParseMessage";
import HandleDataInLocalStorage from "../functions/HandleDataInLocalStorage";
import { MESSAGE_TYPE, MessageItem } from "../types";
import { ToDoMessageItemProps } from "../components/types";
import { weekTargetTag } from "BulletNote/functions/getTagsFromMessageList";

export const handleMessageItemRemoveTag = (tag: string) => (messageItem: MessageItem) => {
  let filteredTagList = messageItem.message.tagList.filter(t => {
    return t.id !== tag;
  });
  filteredTagList = filteredTagList.length === 0 ? [HandleParseMessage.defaultTag] : filteredTagList;
  const rawMessageWithoutTag = messageItem.message.rawMessage.replace(tag, '');

  const res: MessageItem = {
    ...messageItem,
    message: {
      ...messageItem.message,
      tagList: filteredTagList,
      rawMessage: rawMessageWithoutTag,
    }
  };

  return res;
};

const inputPartReducers = (state: BulletNoteState, action: InputPartActions): BulletNoteState['messageList'] => {
  let newMessageList = [...state.messageList];

  switch (action.type) {

  case BulletNoteActionTypes.ADD_MESSAGE: {
    const {
      messageList
    } = state;
    const lastMessageId = messageList.length === 0 ? (
      -1
    ): Number(messageList.slice(-1)[0].message.id);
    const newId = String(lastMessageId + 1);
    
    let handledMessage = HandleParseMessage
      .convertRawMessageToMessageItem({
        id: newId,
        rawMessage: action.payload.rawMessage
      });
    handledMessage = HandleParseMessage.handleMessageItemWithWeekTarget(handledMessage);

    newMessageList = [
      ...state.messageList,
      handledMessage,
    ];

    const sorted = [...newMessageList].sort(HandleParseMessage.sortMessageListByDateFn('acc'));
    newMessageList = sorted;

    break;
  }

  case BulletNoteActionTypes.SET_MESSAGE_FROM_DB: {
    const {
      rawMessageFromDBList
    } = action.payload;
    const messageList = rawMessageFromDBList.map((r) => (
      HandleParseMessage.convertRawMessageToMessageItem(r)
    ));
    newMessageList = messageList;
    break;
  }

  case BulletNoteActionTypes.DELETE_MESSAGE: {
    const {
      id
    } = action.payload;
    newMessageList = state.messageList.filter(m => {
      return id !== m.message.id;
    });
    break;
  }

  case BulletNoteActionTypes.MOVE_MESSAGE_TO_LATEST: {
    const {
      id
    } = action.payload;
    const index = newMessageList.findIndex((m) => m.message.id === id);
    if(index !== -1) {
      const lastMessageId = newMessageList.length === 0 ? (
        -1
      ): Number(newMessageList.slice(-1)[0].message.id);
      const newId = String(lastMessageId + 1);

      let movedNewMessage: MessageItem = {
        ...newMessageList[index],
        message: {
          ...newMessageList[index].message,
          id: newId,
          createdAt: new Date(),
        }
      };
      movedNewMessage = handleMessageItemRemoveTag(weekTargetTag)(movedNewMessage);

      newMessageList = [
        ...newMessageList.slice(0, index),
        ...newMessageList.slice(index + 1),
        movedNewMessage,
      ];
    }
    break;
  }

  case BulletNoteActionTypes.TOGGLE_MESSAGE_ISDONE: {
    const {
      id,
      isDone
    } = action.payload;

    const index = newMessageList.findIndex((m) => m.message.id === id);
    if(index !== -1) {
      if(newMessageList[index].type === MESSAGE_TYPE.TODO) {
        newMessageList[index] = {
          ...newMessageList[index],
          status: {
            ...newMessageList[index].status,
            isDone: isDone,
          }
        } as ToDoMessageItemProps;
      }
    }
    break;
  }

  case BulletNoteActionTypes.TOGGLE_MESSAGE_ISSTAR: {
    const {
      id,
      starLevelNum
    } = action.payload;
    // console.log(id,
    //   starLevelNum);

    const index = newMessageList.findIndex((m) => m.message.id === id);
    if(index !== -1) {
      newMessageList[index] = {
        ...newMessageList[index],
        message: {
          ...newMessageList[index].message,
          starLevelNum: starLevelNum
        }
      };
    }
    break;
  }

  case BulletNoteActionTypes.TOGGLE_MESSAGE_ISPIN: {
    const {
      id,
      isPin
    } = action.payload;

    const index = newMessageList.findIndex((m) => m.message.id === id);
    if(index !== -1) {
      newMessageList[index] = {
        ...newMessageList[index],
        message: {
          ...newMessageList[index].message,
          isPin,
        }
      };
    }
    break;
  }
  
  case BulletNoteActionTypes.EDIT_MESSAGE: {
    const {
      id,
      newMessage: newRawMessage
    } = action.payload;

    const index = newMessageList.findIndex((m) => m.message.id === id);
    if(index !== -1) {
      // const tagsStr = newMessageList[index].message.tagList.map(t => {
      //   if(t.id === HandleParseMessage.defaultTag.id) return '';
      //   return t.name;
      // }).join(' ');
      const originMessage = newMessageList[index];
      const isDone = originMessage.type === MESSAGE_TYPE.TODO ? originMessage.status.isDone : false;

      const newMessage = HandleParseMessage.convertRawMessageToMessageItem({
        ...originMessage.message,
        isDone,
        rawMessage: newRawMessage,
      });
      
      newMessageList[index] = newMessage;
      console.log(newMessageList[index].message.tagList);
    }
    break;
  }

  default:
    break;
  }

  if(newMessageList.length > 0) {
    HandleDataInLocalStorage.setData(newMessageList);
  }
  
  return newMessageList;
};

export default inputPartReducers;