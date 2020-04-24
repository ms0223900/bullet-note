import { combineReducers } from "react-function-helpers";
import { BulletNoteState } from "../constants/context";
import inputPartReducers from "./message-reducers";
import config from "./config-reducers";

const reducers = combineReducers<BulletNoteState>({
  messageList: inputPartReducers,
  bulletNoteConfig: config,
});

export default reducers;