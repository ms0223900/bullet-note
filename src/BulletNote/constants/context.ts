import { MessageList } from "../types";
import { createContextValueFn, createContextStore } from "react-function-helpers/lib/functions/contextHelpers";
import reducers from "../reducers";
import ContextWrapperFn from "react-function-helpers/lib/functions/ContextWrapper";

export interface BulletNoteConfig {
  // showTagList: boolean
  showingDaysRange: number
}

export interface BulletNoteState {
  messageList: MessageList
  bulletNoteConfig: BulletNoteConfig
}

const initBulletNoteConfig: BulletNoteConfig = {
  showingDaysRange: 7, //one week
};

const initState: BulletNoteState = {
  messageList: [],
  bulletNoteConfig: initBulletNoteConfig,
};

const ContextValueFn  = createContextValueFn(initState, reducers);

export const ContextStore = createContextStore(initState);

export const ContextWrapper = ContextWrapperFn(ContextValueFn, ContextStore);

export default ContextWrapper;