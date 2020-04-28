import { BulletNoteState } from "BulletNote/constants/context";
import ConfigActions from "BulletNote/actions/config-actions";
import { BulletNoteActionTypes } from "BulletNote/actions";

const config = (state: BulletNoteState, action: ConfigActions): BulletNoteState['bulletNoteConfig'] => {
  switch (action.type) {
  case BulletNoteActionTypes.SET_DAYS_RANGE:
    return ({
      ...state.bulletNoteConfig,
      showingDaysRange: action.payload.daysRange,
    });
  case BulletNoteActionTypes.SET_FILTER_TAGS:
    return ({
      ...state.bulletNoteConfig,
      selectedFilterTags: action.payload.tags,
    });
  default:
    return state.bulletNoteConfig;
  }
};

export default config;