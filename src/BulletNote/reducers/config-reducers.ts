import { BulletNoteState, initShowingDaysRange, initIsFilteringDone } from "BulletNote/constants/context";
import ConfigActions from "BulletNote/actions/config-actions";
import { BulletNoteActionTypes } from "BulletNote/actions";

const config = (state: BulletNoteState, action: ConfigActions): BulletNoteState['bulletNoteConfig'] => {
  switch (action.type) {

    case BulletNoteActionTypes.SET_DAYS_RANGE: {
      return ({
        ...state.bulletNoteConfig,
        showingDaysRange: action.payload.daysRange,
      });
    }

    case BulletNoteActionTypes.ADD_DAYS_RANGE: {
      const newDays = state.bulletNoteConfig.showingDaysRange + action.payload.daysRange;
      return ({
        ...state.bulletNoteConfig,
        showingDaysRange: newDays,
      });
    }
    
    case BulletNoteActionTypes.SET_FILTER_TAGS:
      return ({
        ...state.bulletNoteConfig,
        isFilteringDone: initIsFilteringDone,
        selectedFilterTags: action.payload.tags,
      });
  
    case BulletNoteActionTypes.TOGGLE_IS_FILTERING_DONE:
      return ({
        ...state.bulletNoteConfig,
        isFilteringDone: action.payload.isFilteringDone,
      });
  
    case BulletNoteActionTypes.SET_NOTE_MODE: {
      return ({
        ...state.bulletNoteConfig,
        isFilteringDone: initIsFilteringDone,
        showingDaysRange: initShowingDaysRange,
        noteMode: action.payload.noteMode,
      });
    }

    default:
      return state.bulletNoteConfig;
  }
};

export default config;