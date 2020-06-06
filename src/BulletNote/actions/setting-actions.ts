import { BulletNoteActionTypes } from ".";
import { BulletNoteSetting } from "BulletNote/constants/context";

export interface ToggleIsShowDateTagDivierPayload {
  isShowDateTagDivier: BulletNoteSetting['isShowDateTagDivier']
}

export interface ToggleIsShowDateTagDivierAction {
  type: BulletNoteActionTypes.TOGGLE_IS_SHOW_DATE_TAG_DIVIDER
  payload: ToggleIsShowDateTagDivierPayload
}

export const toggleIsShowDateTagDivier = (isShowDateTagDivier: boolean): ToggleIsShowDateTagDivierAction => ({
  type: BulletNoteActionTypes.TOGGLE_IS_SHOW_DATE_TAG_DIVIDER,
  payload: { isShowDateTagDivier }
});

type SettingActions = 
  ToggleIsShowDateTagDivierAction

export default SettingActions;