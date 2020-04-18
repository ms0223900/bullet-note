import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAZIVD5abF8A49qiz7QI1cqDner4MGtZPM",
  authDomain: "bullet-note.firebaseapp.com",
  databaseURL: "https://bullet-note.firebaseio.com",
  projectId: "bullet-note",
  storageBucket: "bullet-note.appspot.com",
  messagingSenderId: "373183189354",
  appId: "1:373183189354:web:7a33552c9febc150c7d513",
  measurementId: "G-SPRTKCHE2L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();

export const firebasePath = (userId: string) => (
  `/${userId}/bullet-note`
);

export default database;