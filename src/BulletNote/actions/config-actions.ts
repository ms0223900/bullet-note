import { BulletNoteActionTypes } from ".";

export interface SetDaysRangePayload {
  daysRange: number
}

export interface SetFilterTagsPayload {
  tags: string[]
}

export interface SetDaysRangeAction {
  type: BulletNoteActionTypes.SET_DAYS_RANGE,
  payload: SetDaysRangePayload
}

export interface SetFilterTagsAction {
  type: BulletNoteActionTypes.SET_FILTER_TAGS,
  payload: SetFilterTagsPayload
}

export const setDaysRange = (daysRange: number): SetDaysRangeAction => ({
  type: BulletNoteActionTypes.SET_DAYS_RANGE,
  payload: { daysRange }
});

export const setFilterTags = (tags: string[]): SetFilterTagsAction => ({
  type: BulletNoteActionTypes.SET_FILTER_TAGS,
  payload: { tags }
});

type ConfigActions = 
  SetDaysRangeAction |
  SetFilterTagsAction

export default ConfigActions;