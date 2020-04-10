import { BulletNoteState } from "../constants/context";
import InputPartActions from "../actions/message-actions";
import { BulletNoteActionTypes } from "../actions";
import HandleParseMessage from "../functions/handleParseMessage";
import HandleDataInLocalStorage from "../functions/HandleDataInLocalStorage";
import { MESSAGE_TYPE, MessageItem } from "../types";
import { ToDoMessageItemProps } from "../components/types";

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
    
    const handledMessage = HandleParseMessage
      .convertRawMessageToMessageItem({
        id: newId,
        rawMessage: action.payload.rawMessage
      });
    newMessageList = [
      ...state.messageList,
      handledMessage,
    ];
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
      isStar
    } = action.payload;
    console.log(id,
      isStar);

    const index = newMessageList.findIndex((m) => m.message.id === id);
    if(index !== -1) {
      newMessageList[index] = {
        ...newMessageList[index],
        message: {
          ...newMessageList[index].message,
          isStared: isStar
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
      newMessage
    } = action.payload;

    const index = newMessageList.findIndex((m) => m.message.id === id);
    if(index !== -1) {
      const tagsStr = newMessageList[index].message.tagList.map(t => {
        if(t.id === HandleParseMessage.defaultTag.id) return '';
        return t.name;
      }).join(' ');
      newMessageList[index] = {
        ...newMessageList[index],
        message: {
          ...newMessageList[index].message,
          rawMessage: newMessage + ' ' + tagsStr,
        }
      };
        
      console.log(newMessageList[index].message.tagList);
    }
    break;
  }

  default:
    break;
  }
  
  HandleDataInLocalStorage.setData(newMessageList);
  return newMessageList;
};

export default inputPartReducers;