import database, { firebasePath } from "./config";
import { ReadWriteDataToDBParams } from "./types";
import checkIsSignIn from "../SignAndLog/checkIsSignIn";

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
    const writeToFirebase = (isSignedIn: boolean, user: firebase.User | null) => {
      if(user) {
        database
          .ref(firebasePath(user.uid))
          .set(data)
          .finally(() => {
            successCb && successCb();
          })
          .catch((err) => {
            errorCb && errorCb(err);
          });
      } else {
        errorCb && errorCb({
          message: 'Please Login.',
        });
      }
    };
    checkIsSignIn()
      .then(res => writeToFirebase(res.isSignIn, res.user));
  }
};

export default writeWholeDataToDB;