import { Callback } from "common-types";

export interface ReadWriteDataToDBParams {
  userId: string | undefined
  successCb?: Callback
  errorCb?: Callback
  data?: any
}