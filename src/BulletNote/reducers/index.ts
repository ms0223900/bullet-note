import { combineReducers } from "react-function-helpers";
import { BulletNoteState } from "../constants/context";
import inputPartReducers from "./message-reducers";

const reducers = combineReducers<BulletNoteState>({
  messageList: inputPartReducers,
});

export default reducers;