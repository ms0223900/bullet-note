import React, { useCallback } from 'react';
import { Box, makeStyles, Container, CircularProgress, Typography } from '@material-ui/core';
import ContextWrapper, { BulletNoteState } from './constants/context';
import InputPartContainerWithCtx from './containers/InputPart/InputPartContainer';
import NotePartContainerWithCtx from './containers/NotePart/NotePartContainer';
import './styles/style.scss';
import SyncToFirebaseWithCtx from './containers/SyncToFirebase';
import { useParams } from 'react-router';
import checkIsSignIn from './functions/SignAndLog/checkIsSignIn';
import LoginPart from './containers/LoginPart';
import HandleDataInLocalStorage from './functions/HandleDataInLocalStorage';
import readFromDB from './functions/firebase/readFromDB';
import HandleParseMessage from './functions/handleParseMessage';

const navHeight = 32;

const useStyles = makeStyles(theme => ({
  root: {
    '&::-webkit-scrollbar': {
      width: 8,
    }
  },
  notePart: {
    maxHeight: `calc(100vh - 80px - ${navHeight}px)`,
    overflow: 'auto',
  },
  inputPart: {
    position: 'fixed',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    right: theme.spacing(1),
  }
}));

const BulletNotePage = () => {
  const classes = useStyles();
  const {
    userId
  } = useParams<{ userId: string }>();

  const [isSignIn, setSignIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isOffline, setOffline] = React.useState(false);
  // const [initMessageList, setMessageList] = React.useState<BulletNoteState['messageList']>([]);

  const handleSetFirebaseDataToLS = useCallback(() => {
    readFromDB({
      userId,
      successCb: (rawData) => {
        HandleDataInLocalStorage.setDataFromRawData(rawData);
        setLoading(false);
        // window.location.reload();
      }
    });
  }, [userId]);

  const handleLogIn = useCallback((signInRes: boolean) => {
    setSignIn(signInRes);
    handleSetFirebaseDataToLS();
  }, [handleSetFirebaseDataToLS]);

  React.useEffect(() => {
    // checkIsSignIn(userId, handleLogIn);
  }, [handleLogIn, userId]);

  React.useEffect(() => {
    if(!isSignIn) {
      const LSdata = HandleDataInLocalStorage.getData();
      if(LSdata.length > 0) {
        setSignIn(true);
        setLoading(false);
        setOffline(true);
      } 
    }
  }, [handleSetFirebaseDataToLS, isSignIn]);

  if(loading) {
    return <CircularProgress />;
  }

  if(!isSignIn) {
    return (
      <LoginPart />
    );
  }

  return (
    <ContextWrapper customInitState={{
      // messageList: initMessageList,
    }}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        height={navHeight}
        style={{
          backgroundColor: '#bca1ed'
        }}
      >
        <SyncToFirebaseWithCtx />
        {isOffline && (
          <Typography
            color={'textSecondary'}
          >
            {'Offline Mode'}
          </Typography>
        )}
      </Box>
      <Container>
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



export default BulletNotePage;