import { MessageList } from "../types";
import { createContextValueFn, createContextStore } from "react-function-helpers/lib/functions/contextHelpers";
import reducers from "../reducers";
import ContextWrapperFn from "react-function-helpers/lib/functions/ContextWrapper";

type NoteMode = 'normal' | 'tag-whole-page'
export const initNoteMode: NoteMode = 'normal';

export interface BulletNoteConfig {
  // showTagList: boolean
  noteMode: NoteMode
  selectedFilterTags: string[]
  showingDaysRange: number
  isFilteringDone: boolean
  isFilteringStared: boolean
}

export interface BulletNoteState {
  messageList: MessageList
  bulletNoteConfig: BulletNoteConfig
}

const initBulletNoteConfig: BulletNoteConfig = {
  noteMode: initNoteMode,
  selectedFilterTags: [],
  showingDaysRange: 14, //two weeks
  isFilteringDone: false,
  isFilteringStared: false,
};

const initState: BulletNoteState = {
  messageList: [],
  bulletNoteConfig: initBulletNoteConfig,
};

const ContextValueFn  = createContextValueFn(initState, reducers);

export const ContextStore = createContextStore(initState);

export const ContextWrapper = ContextWrapperFn(ContextValueFn, ContextStore);

export default ContextWrapper;
