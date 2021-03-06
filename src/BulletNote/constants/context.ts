import { MessageList } from "../types";
import { createContextValueFn, createContextStore } from "react-function-helpers/lib/functions/contextHelpers";
import reducers from "../reducers";
import ContextWrapperFn from "react-function-helpers/lib/functions/ContextWrapper";

export type NoteMode = 'normal' | 'tag-whole-page'
export const initNoteMode: NoteMode = 'normal';
// export const initNoteMode: NoteMode = 'tag-whole-page';

export const initSearchingText = '';
export const initShowingDaysRange = 7; //one week for performance better
// export const initIsFilteringDone = false;
export const initIsFilteringDone = true;

export const initSelectedFilterTags = [
  // '#bullet-note'
];

export interface BulletNoteConfig {
  // showTagList: boolean
  searchingText: string | number | undefined
  noteMode: NoteMode
  selectedFilterTags: string[]
  showingDaysRange: number
  isFilteringDone: boolean
  isFilteringStared: boolean
}

export interface BulletNoteSetting {
  isShowDateTagDivier: boolean
  isShowOverDueMessages: boolean
}

export interface BulletNoteState {
  messageList: MessageList
  bulletNoteConfig: BulletNoteConfig
  bulletNoteSetting: BulletNoteSetting
}

const initBulletNoteConfig: BulletNoteConfig = {
  noteMode: initNoteMode,
  selectedFilterTags: initSelectedFilterTags,
  showingDaysRange: initShowingDaysRange,
  isFilteringDone: initIsFilteringDone,
  isFilteringStared: false,
  searchingText: initSearchingText,
};

export const initBulletNoteSetting: BulletNoteSetting = {
  isShowDateTagDivier: false,
  isShowOverDueMessages: false,
};

const initState: BulletNoteState = {
  messageList: [],
  bulletNoteConfig: initBulletNoteConfig,
  bulletNoteSetting: initBulletNoteSetting,
};

const ContextValueFn  = createContextValueFn(initState, reducers);

export const ContextStore = createContextStore(initState);

export const ContextWrapper = ContextWrapperFn(ContextValueFn, ContextStore);

export default ContextWrapper;
