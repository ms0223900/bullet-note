import { MessageList } from "../types";
import { createContextValueFn, createContextStore } from "react-function-helpers/lib/functions/contextHelpers";
import reducers from "../reducers";
import ContextWrapperFn from "react-function-helpers/lib/functions/ContextWrapper";

export type NoteMode = 'normal' | 'tag-whole-page'
export const initNoteMode: NoteMode = 'normal';
export const initShowingDaysRange = 7; //one week for performance better
export const initIsFilteringDone = true;
export const initSelectedFilterTags = ['#bullet-note'];

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
  selectedFilterTags: initSelectedFilterTags,
  showingDaysRange: initShowingDaysRange,
  isFilteringDone: initIsFilteringDone,
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
