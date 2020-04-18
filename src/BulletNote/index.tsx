import React from 'react';
import { Box, makeStyles, Container } from '@material-ui/core';
import ContextWrapper from './constants/context';
import InputPartContainerWithCtx from './containers/InputPart/InputPartContainer';
import NotePartContainerWithCtx from './containers/NotePart/NotePartContainer';
import './styles/style.scss';
import SyncToFirebaseWithCtx from './containers/SyncToFirebase';

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

    // database.ref(`/testWriteObj/${0}`).once('value')
    //   .then((snapshot) => {
    //     console.log(snapshot.val())
    //   })
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
  }, []);

  return (
    <ContextWrapper customInitState={{
      // messageList: messageList
    }}>
      <Container>
        <Box
          height={60}
          style={{
            backgroundColor: '#0be'
          }}
        >
          <SyncToFirebaseWithCtx />
        </Box>
        <Box padding={1} className={classes.root}>
          <Box className={classes.notePart}>
            <NotePartContainerWithCtx />
          </Box>
          <Box className={classes.inputPart}>
            <InputPartContainerWithCtx />
          </Box>
        </Box>
      </Container>
    </ContextWrapper>
  );
};



export default BulletNote;