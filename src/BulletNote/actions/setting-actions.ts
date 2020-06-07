import { BulletNoteActionTypes } from ".";
import { BulletNoteSetting } from "BulletNote/constants/context";

export interface ToggleIsShowDateTagDivierPayload {
  isShowDateTagDivier: BulletNoteSetting['isShowDateTagDivier']
}
export interface ToggleIsShowOverDueMessagesPayload {
  isShowOverDueMessages: BulletNoteSetting['isShowOverDueMessages']
}

export interface ToggleIsShowDateTagDivierAction {
  type: BulletNoteActionTypes.TOGGLE_IS_SHOW_DATE_TAG_DIVIDER
  payload: ToggleIsShowDateTagDivierPayload
}
export interface ToggleIsShowOverDueMessagesAction {
  type: BulletNoteActionTypes.TOGGLE_IS_SHOW_OVER_DUE_MESSAGES
  payload: ToggleIsShowOverDueMessagesPayload
}

export const toggleIsShowDateTagDivier = (isShowDateTagDivier: boolean): ToggleIsShowDateTagDivierAction => ({
  type: BulletNoteActionTypes.TOGGLE_IS_SHOW_DATE_TAG_DIVIDER,
  payload: { isShowDateTagDivier }
});
export const toggleIsShowOverDueMessages = (isShowOverDueMessages: boolean): ToggleIsShowOverDueMessagesAction => ({
  type: BulletNoteActionTypes.TOGGLE_IS_SHOW_OVER_DUE_MESSAGES,
  payload: { isShowOverDueMessages }
});

type SettingActions = 
  ToggleIsShowDateTagDivierAction |
  ToggleIsShowOverDueMessagesAction

export default SettingActions;