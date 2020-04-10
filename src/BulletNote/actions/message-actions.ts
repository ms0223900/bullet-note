import { BulletNoteActionTypes } from ".";
import { SingleRawMessageFromDB } from "../types";

interface AddMessageActionPayload {
  rawMessage: string
}
interface SetMessageFromDB {
  rawMessageFromDBList: SingleRawMessageFromDB[]
}
interface DeleteMessageActionPayload {
  id: string
}
interface ToggleMessageIsDonePayload {
  id: string
  isDone: boolean
}

interface ToggleMessageIsStarPayload {
  id: string
  isStar: boolean | undefined
}

interface ToggleMessageIsPinPayload {
  id: string
  isPin: boolean | undefined
}

interface EditMessageActionPayload {
  id: string
  newMessage: string
}

interface DeleteMessageAction {
  type: BulletNoteActionTypes.DELETE_MESSAGE,
  payload: DeleteMessageActionPayload
}
interface AddMessageAction {
  type: BulletNoteActionTypes.ADD_MESSAGE,
  payload: AddMessageActionPayload
}
interface SetMessageFromDBAction {
  type: BulletNoteActionTypes.SET_MESSAGE_FROM_DB,
  payload: SetMessageFromDB
}
interface ToggleMessageIsDone {
  type: BulletNoteActionTypes.TOGGLE_MESSAGE_ISDONE,
  payload: ToggleMessageIsDonePayload
}
interface ToggleMessageIsStar {
  type: BulletNoteActionTypes.TOGGLE_MESSAGE_ISSTAR,
  payload: ToggleMessageIsStarPayload
}

interface ToggleMessageIsPin {
  type: BulletNoteActionTypes.TOGGLE_MESSAGE_ISPIN,
  payload: ToggleMessageIsPinPayload
}

interface EditMessageAction {
  type: BulletNoteActionTypes.EDIT_MESSAGE,
  payload: EditMessageActionPayload
}

export const addMessage = (rawMessage: string): AddMessageAction => ({
  type: BulletNoteActionTypes.ADD_MESSAGE,
  payload: {
    rawMessage,
  }
});

export const setMessageFromDB = (rawMessageFromDBList: SingleRawMessageFromDB[]): SetMessageFromDBAction => ({
  type: BulletNoteActionTypes.SET_MESSAGE_FROM_DB,
  payload: {
    rawMessageFromDBList,
  }
});

export const deleteMessage = (id: string): DeleteMessageAction => ({
  type: BulletNoteActionTypes.DELETE_MESSAGE,
  payload: { id }
});

export const toggleMessageIsDone = (id: string, isDone: boolean): ToggleMessageIsDone => ({
  type: BulletNoteActionTypes.TOGGLE_MESSAGE_ISDONE,
  payload: {
    id,
    isDone,
  }
});

export const toggleMessageIsStar = (id: string, isStar?: boolean): ToggleMessageIsStar => ({
  type: BulletNoteActionTypes.TOGGLE_MESSAGE_ISSTAR,
  payload: {
    id,
    isStar,
  }
});

export const toggleMessageIsPin = (id: string, isPin?: boolean): ToggleMessageIsPin => ({
  type: BulletNoteActionTypes.TOGGLE_MESSAGE_ISPIN,
  payload: {
    id,
    isPin,
  }
});

export const editMessage = (id: string, newMessage: string): EditMessageAction => ({
  type: BulletNoteActionTypes.EDIT_MESSAGE,
  payload: { 
    id,
    newMessage 
  },
});

type InputPartActions = 
  AddMessageAction | 
  SetMessageFromDBAction | 
  DeleteMessageAction | 
  ToggleMessageIsDone | 
  EditMessageAction | 
  ToggleMessageIsStar |
  ToggleMessageIsPin

export default InputPartActions;