import database, { firebasePath } from "./config";
import { ReadWriteDataToDBParams } from "./types";

const writeWholeDataToDB = ({
  userId,
  data,
  successCb,
  errorCb,
}: ReadWriteDataToDBParams) => {
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