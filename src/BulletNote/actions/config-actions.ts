import { BulletNoteActionTypes } from ".";

export interface SetDaysRangePayload {
  daysRange: number
}

export interface SetFilterTagsPayload {
  tags: string[]
}

export interface ToggleIsFilteringDonePayload {
  isFilteringDone: boolean
}

export interface SetDaysRangeAction {
  type: BulletNoteActionTypes.SET_DAYS_RANGE,
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

export const setDaysRange = (daysRange: number): SetDaysRangeAction => ({
  type: BulletNoteActionTypes.SET_DAYS_RANGE,
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

type ConfigActions = 
  SetDaysRangeAction |
  SetFilterTagsAction |
  ToggleIsFilteringDoneAction

export default ConfigActions;