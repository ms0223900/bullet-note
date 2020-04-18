import database, { firebasePath } from "./config";
import { Callback } from "common-types";

interface WriteWholeDataToDBParams {
  userId: string | undefined
  successCb?: Callback
  errorCb?: Callback
  data: any
}

const writeWholeDataToDB = ({
  userId,
  data,
  successCb,
  errorCb,
}: WriteWholeDataToDBParams) => {
  if(!userId) {
    // window.alert('Please Login.');
    errorCb && errorCb({
      message: 'Please Login.',
    });
  } else {
    database
      .ref(firebasePath(userId))
      .set(data)
      .finally(() => {
        successCb && successCb();
      })
      .catch((err) => {
        errorCb && errorCb(err);
      });
  }
};

export default writeWholeDataToDB;