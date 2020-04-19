import database, { firebasePath } from "./config";
import { ReadWriteDataToDBParams } from "./types";

const readFromDB = ({
  userId,
  successCb,
  errorCb,
}: ReadWriteDataToDBParams) => {
  if(!userId) {
    errorCb && errorCb({
      message: 'Please Login or check network.'
    });
  } else {
    const path = firebasePath(userId);
    database
      .ref(path)
      .once('value')
      .then(snapshot => {
        const value = snapshot.val();
        console.log('snapshot from firebase: ', value);
        successCb && successCb(value);
      })
      .catch(err => {
        errorCb && errorCb(err);
      });
  }
};

export default readFromDB;