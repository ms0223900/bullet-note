import { MessageList } from "../types";
import { createContextValueFn, createContextStore } from "react-function-helpers/lib/functions/contextHelpers";
import reducers from "../reducers";
import ContextWrapperFn from "react-function-helpers/lib/functions/ContextWrapper";

export interface BulletNoteState {
  messageList: MessageList
}

const initState: BulletNoteState = {
  messageList: []
};

const ContextValueFn  = createContextValueFn(initState, reducers);

export const ContextStore = createContextStore(initState);

export const ContextWrapper = ContextWrapperFn(ContextValueFn, ContextStore);

export default ContextWrapper;
