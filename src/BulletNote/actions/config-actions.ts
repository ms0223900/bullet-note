import { BulletNoteActionTypes } from ".";

export interface SetDaysRangePayload {
  daysRange: number
}

export interface SetDaysRangeAction {
  type: BulletNoteActionTypes.SET_DAYS_RANGE,
  payload: SetDaysRangePayload
}

export const setDaysRange = (daysRange: number): SetDaysRangeAction => ({
  type: BulletNoteActionTypes.SET_DAYS_RANGE,
  payload: { daysRange }
});

type ConfigActions = 
  SetDaysRangeAction

export default ConfigActions;