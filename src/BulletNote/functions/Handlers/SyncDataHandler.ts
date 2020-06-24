import { Callback } from "common-types";
import { stringifyMessageList } from "../stringifySingleMessage";
import HandleDataInLocalStorage from "./HandleDataInLocalStorage";

const refreshErrorMessage = 'Please switch to online mode or refresh page.';

class SyncDataHander {
  static checkLocalStorageDataWithOnlineData = ({
    onlineData,
    errorCb,
    successCb
  }: {
    onlineData: any, 
    errorCb: Callback
    successCb: Callback
  }): boolean => {
    const LSdata = stringifyMessageList(HandleDataInLocalStorage.getData());
    const stringifiedOnlineData = stringifyMessageList(onlineData);
    const res = LSdata === stringifiedOnlineData;
    if(!res) {
      errorCb({
        message: refreshErrorMessage,
      });
    } else {
      HandleDataInLocalStorage.setCheckLocalWithOnlineLS(true);
      successCb();
    }
    return res;
  }
}

export default SyncDataHander;