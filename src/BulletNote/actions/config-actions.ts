import { BulletNoteActionTypes } from ".";
import { BulletNoteState } from "BulletNote/constants/context";

export interface SetDaysRangePayload {
  daysRange: number
}
export interface SetFilterTagsPayload {
  tags: string[]
}
export interface ToggleIsFilteringDonePayload {
  isFilteringDone: boolean
}
export interface SetNoteModePayload {
  noteMode: BulletNoteState['bulletNoteConfig']['noteMode']
}
export interface SetBulletNoteConfigPayload {
  bulletNoteConfig: Partial<BulletNoteState['bulletNoteConfig']>
}

export interface SetDaysRangeAction {
  type: BulletNoteActionTypes.SET_DAYS_RANGE,
  payload: SetDaysRangePayload
}
export interface AddDaysRangeAction {
  type: BulletNoteActionTypes.ADD_DAYS_RANGE,
  payload: SetDaysRangePayload
}
export interface SetFilterTagsAction {
  type: BulletNoteActionTypes.SET_FILTER_TAGS,
  payload: SetFilterTagsPayload
}
export interface ToggleIsFilteringDoneAction {
  type: BulletNoteActionTypes.TOGGLE_IS_FILTERING_DONE,
  payload: ToggleIsFilteringDonePayload
}
export interface SetNoteModeAction {
  type: BulletNoteActionTypes.SET_NOTE_MODE,
  payload: SetNoteModePayload
}
export interface SetBulletNoteConfigAction {
  type: BulletNoteActionTypes.SET_BULLET_NOTE_CONFIG,
  payload: SetBulletNoteConfigPayload
}

export const setDaysRange = (daysRange: number): SetDaysRangeAction => ({
  type: BulletNoteActionTypes.SET_DAYS_RANGE,
  payload: { daysRange }
});
export const addDaysRange = (daysRange: number): AddDaysRangeAction => ({
  type: BulletNoteActionTypes.ADD_DAYS_RANGE,
  payload: { daysRange }
});

export const setFilterTags = (tags: string[]): SetFilterTagsAction => ({
  type: BulletNoteActionTypes.SET_FILTER_TAGS,
  payload: { tags }
});

export const toggleIsFilteringDone = (isFilteringDone: boolean): ToggleIsFilteringDoneAction => ({
  type: BulletNoteActionTypes.TOGGLE_IS_FILTERING_DONE,
  payload: { isFilteringDone, }
});

export const setNoteMode = (noteMode: SetNoteModePayload['noteMode']): SetNoteModeAction => ({
  type: BulletNoteActionTypes.SET_NOTE_MODE,
  payload: { noteMode, }
});

export const setBulletNoteConfig = (bulletNoteConfig: SetBulletNoteConfigPayload['bulletNoteConfig']): SetBulletNoteConfigAction => ({
  type: BulletNoteActionTypes.SET_BULLET_NOTE_CONFIG,
  payload: { bulletNoteConfig, }
});

type ConfigActions = 
  SetDaysRangeAction |
  AddDaysRangeAction |
  SetFilterTagsAction |
  ToggleIsFilteringDoneAction |
  SetNoteModeAction |
  SetBulletNoteConfigAction

export default ConfigActions;