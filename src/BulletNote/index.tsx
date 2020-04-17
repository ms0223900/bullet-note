import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ContextWrapper from './constants/context';
import InputPartContainerWithCtx from './containers/InputPart/InputPartContainer';
import NotePartContainerWithCtx from './containers/NotePart/NotePartContainer';
import './styles/style.scss';

import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAZIVD5abF8A49qiz7QI1cqDner4MGtZPM",
  authDomain: "bullet-note.firebaseapp.com",
  databaseURL: "https://bullet-note.firebaseio.com",
  projectId: "bullet-note",
  storageBucket: "bullet-note.appspot.com",
  messagingSenderId: "373183189354",
  appId: "1:373183189354:web:7a33552c9febc150c7d513",
  measurementId: "G-SPRTKCHE2L"
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

const useStyles = makeStyles(theme => ({
  root: {
    '&::-webkit-scrollbar': {
      width: 8,
    }
  },
  notePart: {
    maxHeight: 'calc(100vh - 80px)',
    overflow: 'auto',
  },
  inputPart: {
    position: 'fixed',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    right: theme.spacing(1),
  }
}));

const BulletNote = () => {
  const classes = useStyles();

  React.useEffect(() => {
    // const userId = firebase.auth().currentUser?.uid

    database.ref(`/testWriteObj/${0}`).once('value')
      .then((snapshot) => {
        console.log(snapshot.val())
      })
    // database.ref('/testWriteObj/0')
    //   .set({
    //     testWriteIndex: {
    //       a: 1,
    //       b: '2',
    //     }
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })
  }, [])

  return (
    <ContextWrapper customInitState={{
      // messageList: messageList
    }}>
      <Box padding={1} className={classes.root}>
        <Box className={classes.notePart}>
          <NotePartContainerWithCtx />
        </Box>
        <Box className={classes.inputPart}>
          <InputPartContainerWithCtx />
        </Box>
      </Box>
    </ContextWrapper>
  );
};



export default BulletNote;