import { firebaseApp } from '../firebase/config';
import { Callback } from 'common-types';

const checkIsSignIn = (userId: string | undefined, cb?: Callback) => {
  firebaseApp.auth().onAuthStateChanged(user => {
    let isSignedIn = false;
    console.log(user);
    if(user) {
      const isSameUser = user.uid === userId;
      console.log(userId);
      if(isSameUser) {
        isSignedIn = true;
      };
    } else {
      isSignedIn = false;
    }
    cb && cb(isSignedIn, user);
  });
  // return isSignedIn;
};

export default checkIsSignIn;