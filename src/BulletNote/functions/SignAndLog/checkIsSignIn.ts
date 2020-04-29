import { firebaseApp } from '../firebase/config';
import { Callback } from 'common-types';

export type CheckIsSignInCb = (isSignedIn: boolean, user: firebase.User | null) => any

const checkIsSignIn = (cb?: CheckIsSignInCb) => {
  firebaseApp.auth().onAuthStateChanged(user => {
    let isSignedIn = false;
    console.log(user);
    if(user) {
      isSignedIn = true;
      // const isSameUser = user.uid === userId;
      // console.log(userId);
      // if(isSameUser) {
      //   isSignedIn = true;
      // };
    } else {
      isSignedIn = false;
    }
    cb && cb(isSignedIn, user);
  });
  // return isSignedIn;
};

export default checkIsSignIn;