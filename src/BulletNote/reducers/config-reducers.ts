import { BulletNoteState, initShowingDaysRange, initIsFilteringDone } from "BulletNote/constants/context";
import ConfigActions from "BulletNote/actions/config-actions";
import { BulletNoteActionTypes } from "BulletNote/actions";
import ConfigLocalStorageHandler from "BulletNote/functions/Handlers/ConfigLocalStorageHandler";
import { searchingTag, dueDateUniqueTag } from "BulletNote/config";

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
    
    case BulletNoteActionTypes.SET_FILTER_TAGS: {
      const newConfig = ({
        ...state.bulletNoteConfig,
        isFilteringDone: true,
        selectedFilterTags: action.payload.tags,
      });
      ConfigLocalStorageHandler.setData(newConfig);
      return newConfig;
    }
  
    case BulletNoteActionTypes.TOGGLE_IS_FILTERING_DONE:
      return ({
        ...state.bulletNoteConfig,
        isFilteringDone: action.payload.isFilteringDone,
      });
  
    case BulletNoteActionTypes.SET_NOTE_MODE: {
      const newConfig = ({
        ...state.bulletNoteConfig,
        isFilteringDone: true,
        showingDaysRange: initShowingDaysRange,
        noteMode: action.payload.noteMode,
      });
      ConfigLocalStorageHandler.setData(newConfig);
      return newConfig;
    }

    case BulletNoteActionTypes.SET_DUE_DATE_MODE: {
      if(state.bulletNoteConfig.selectedFilterTags.includes(dueDateUniqueTag)) {
        return state.bulletNoteConfig;
      }
      
      const newConfig: BulletNoteState['bulletNoteConfig'] = ({
        ...state.bulletNoteConfig,
        isFilteringDone: true,
        selectedFilterTags: [
          ...state.bulletNoteConfig.selectedFilterTags,
          dueDateUniqueTag,
        ],
        noteMode: 'tag-whole-page',
      });
      ConfigLocalStorageHandler.setData(newConfig);
      return newConfig;
    }

    case BulletNoteActionTypes.SET_SEARCHING_TEXT: {
      const newConfig: BulletNoteState['bulletNoteConfig'] = ({
        ...state.bulletNoteConfig,
        isFilteringDone: true,
        selectedFilterTags: [
          searchingTag,
        ],
        noteMode: 'tag-whole-page',
        searchingText: action.payload.searchingText,
      });
      ConfigLocalStorageHandler.setData(newConfig);
      return newConfig;
    }

    case BulletNoteActionTypes.SET_BULLET_NOTE_CONFIG: {
      const newConfig = ({
        ...state.bulletNoteConfig,
        ...action.payload.bulletNoteConfig,
      });
      ConfigLocalStorageHandler.setData(newConfig);
      return newConfig;
    }

    default:
      return state.bulletNoteConfig;
  }
};

export default config;