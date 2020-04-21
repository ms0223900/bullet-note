import database, { firebasePath } from "./config";
import { ReadWriteDataToDBParams } from "./types";

const readFromDB = ({
  userId,
  successCb,
  errorCb,
}: ReadWriteDataToDBParams) => {
  if(!userId) {
    errorCb && errorCb({
      message: 'Please check user id again.'
    });
  } else {
    const path = firebasePath(userId);
    database
      .ref(path)
      .once('value')
      .then(snapshot => {
        const value = snapshot.val();
        if(value) {
          console.log('snapshot from firebase: ', value);
          successCb && successCb(value);
        } else {
          errorCb && errorCb({
            message: 'User not found.'
          });
        }
      })
      .catch(err => {
        errorCb && errorCb(err);
      });
  }
};

export default readFromDB;