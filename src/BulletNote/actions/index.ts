import InputPartActions from "./message-actions";

export enum BulletNoteActionTypes {
  ADD_MESSAGE = 'ADD_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  MOVE_MESSAGE_TO_LATEST = 'MOVE_MESSAGE_TO_LATEST',
  
  SET_MESSAGE_FROM_DB = 'SET_MESSAGE_FROM_DB',

  TOGGLE_MESSAGE_ISDONE = 'TOGGLE_MESSAGE_ISDONE',
  TOGGLE_MESSAGE_ISSTAR = 'TOGGLE_MESSAGE_ISSTAR',
  TOGGLE_MESSAGE_ISPIN = 'TOGGLE_MESSAGE_ISPIN',

  EDIT_MESSAGE = 'EDIT_MESSAGE',
  EDIT_IT = 'EDIT_IT',

  SET_DAYS_RANGE = 'SET_DAYS_RANGE',
  ADD_DAYS_RANGE = 'ADD_DAYS_RANGE',
  SET_FILTER_TAGS = 'SET_FILTER_TAGS',
  TOGGLE_IS_FILTERING_DONE = 'TOGGLE_IS_FILTERING_DONE',
  SET_NOTE_MODE = 'SET_NOTE_MODE',
  SET_BULLET_NOTE_CONFIG = 'SET_BULLET_NOTE_CONFIG',
}

type BulletNoteActions = InputPartActions

export default BulletNoteActions;