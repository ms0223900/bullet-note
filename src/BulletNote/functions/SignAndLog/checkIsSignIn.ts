import { firebaseApp } from '../firebase/config';
import { Callback } from 'common-types';

export type CheckIsSignInCb = (isSignedIn: boolean, user: firebase.User | null) => any

export interface CheckIsSignInRes {
  isSignIn: boolean
  user: firebase.User | null
}

const checkIsSignIn = () => {
  const res = new Promise<CheckIsSignInRes>((resolve, rej) => {
    firebaseApp
      .auth()
      .onAuthStateChanged(user => {
        let isSignIn = false;
        console.log(user);
        if(user) {
          isSignIn = true;
          // const isSameUser = user.uid === userId;
          // console.log(userId);
          // if(isSameUser) {
          //   isSignIn = true;
          // };
        } 
        else {
          isSignIn = false;
        }

        resolve({
          isSignIn, user
        });
      });
  });
  return res;
  // return isSignedIn;
};

export default checkIsSignIn;