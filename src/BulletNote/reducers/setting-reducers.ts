import { BulletNoteState, BulletNoteSetting } from "BulletNote/constants/context";
import SettingActions from "BulletNote/actions/setting-actions";
import { BulletNoteActionTypes } from "BulletNote/actions";

export const setting = (state: BulletNoteState, action: SettingActions): BulletNoteSetting => {
  switch (action.type) {
    
    case BulletNoteActionTypes.TOGGLE_IS_SHOW_DATE_TAG_DIVIDER:
      return ({
        ...state.bulletNoteSetting,
        isShowDateTagDivier: action.payload.isShowDateTagDivier,
      });

    case BulletNoteActionTypes.TOGGLE_IS_SHOW_OVER_DUE_MESSAGES:
      return ({
        ...state.bulletNoteSetting,
        isShowOverDueMessages: action.payload.isShowOverDueMessages,
      });

    default:
      return state.bulletNoteSetting;
  }
};