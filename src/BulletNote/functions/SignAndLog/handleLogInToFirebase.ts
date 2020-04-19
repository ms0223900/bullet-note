import { firebaseApp } from "../firebase/config";
import { Callback } from "common-types";

interface HandleLogInToFirebaseParams {
  email: string
  password: string
  successCb?: (userId: string) => any
  errorCb: Callback
}

const handleLogInToFirebase = ({
  email,
  password,
  successCb,
  errorCb,
}: HandleLogInToFirebaseParams) => {
  if(!password) {
    return errorCb({
      message: 'Password is required!'
    });
  }

  if(!email) {
    return errorCb({
      message: 'Email is required!'
    });
  }

  errorCb({
    message: ''
  });

  firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(credential => {
      const { user } = credential;
      if(user) {
        console.log(user);
        successCb && successCb(user.uid);
      }
      // console.log(credential);
    })
    .finally(() => {
    })
    .catch(err => {
      errorCb(err);
    });
};

export default handleLogInToFirebase;