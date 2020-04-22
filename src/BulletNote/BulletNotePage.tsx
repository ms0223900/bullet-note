import React, { useCallback } from 'react';
import { Box, makeStyles, Container, CircularProgress } from '@material-ui/core';
import ContextWrapper from './constants/context';
import InputPartContainerWithCtx from './containers/InputPart/InputPartContainer';
import NotePartContainerWithCtx from './containers/NotePart/NotePartContainer';
import './styles/style.scss';
import { useParams } from 'react-router';
import HandleDataInLocalStorage from './functions/HandleDataInLocalStorage';
import readFromDB from './functions/firebase/readFromDB';
import { offLineModeParam } from './config';
import NavBar, { navHeight } from './components/CommonComponents/NavBar';
import UserNotFoundPage from './components/CommonComponents/UserNotFoundPage';

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

  console.log(userId);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState({
    message: '',
  });
  const [isOffline, setOffline] = React.useState(false);
  // const [initMessageList, setMessageList] = React.useState<BulletNoteState['messageList']>([]);

  const handleSetFirebaseDataToLS = useCallback((_userId: string) => {
    readFromDB({
      userId: _userId,
      successCb: (rawData) => {
        HandleDataInLocalStorage.setDataFromRawData(rawData);
        setLoading(false);
        // window.location.reload();
      },
      errorCb: (error) => {
        setError(error);
        setLoading(false);
      }
    });
  }, []);

  React.useEffect(() => {
    const LSdata = HandleDataInLocalStorage.getData();
    const isHaveLSdata = LSdata && LSdata.length > 0;
    const isOfflineMode = userId === offLineModeParam;

    if(isOfflineMode && isHaveLSdata) {
      setLoading(false);
      setOffline(true);
    } else {
      handleSetFirebaseDataToLS(userId);
    }
  }, [handleSetFirebaseDataToLS, userId]);

  if(loading) {
    return (
      <>
        <CircularProgress />
        {'Loading...'}
      </>
    );
  }

  if(error.message) {
    return (
      <UserNotFoundPage
        errorMessage={error.message} />
    );
  }

  return (
    <ContextWrapper customInitState={{
      // messageList: initMessageList,
    }}>
      <NavBar
        isOffline={isOffline} />
      <Container>
        <Box className={classes.root}>
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