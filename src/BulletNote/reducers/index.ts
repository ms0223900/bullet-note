import { combineReducers } from "react-function-helpers";
import { BulletNoteState } from "../constants/context";
import inputPartReducers from "./message-reducers";
import config from "./config-reducers";
import { setting } from "./setting-reducers";

const reducers = combineReducers<BulletNoteState>({
  messageList: inputPartReducers,
  bulletNoteConfig: config,
  bulletNoteSetting: setting,
});

export default reducers;