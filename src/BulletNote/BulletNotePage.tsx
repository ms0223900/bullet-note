import React, { useCallback, RefObject } from 'react';
import { Box, makeStyles, Container, CircularProgress } from '@material-ui/core';
import { ContextStore } from './constants/context';
import InputPartContainerWithCtx from './containers/InputPart/InputPartContainer';
import NotePartContainerWithCtx from './containers/NotePart/NotePartContainer';
import './styles/style.scss';
import { useParams } from 'react-router';
import HandleDataInLocalStorage from './functions/Handlers/HandleDataInLocalStorage';
import readFromDB from './functions/firebase/readFromDB';
import { offLineModeParam } from './config';
import UserNotFoundPage from './components/CommonComponents/UserNotFoundPage';
import NavBarContainer from './containers/CommonComponents/NavBarContainer';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNotePageProps } from './types';
import { addDaysRange, setBulletNoteConfig } from './actions/config-actions';
import { connectCtx } from 'react-function-helpers';
import ConfigLocalStorageHandler from './functions/Handlers/ConfigLocalStorageHandler';


const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0.5),
  },
  root: {
    '&::-webkit-scrollbar': {
      width: 8,
    }
  },
  notePart: {
  },
  inputPart: {
    position: 'fixed',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    right: theme.spacing(1),
  }
}));

const initBulletNotePageStates = {
  loading: false,
  error: { message: '', },
  isOffline: false,
};

const useBulletNotePage = (params: BulletNotePageProps) => {
  const {
    initBulletNoteConfigFromLS,
  } = params;

  const {
    userId
  } = useParams<{ userId: string }>();

  console.log(userId);
  const [state, setState] = React.useState(initBulletNotePageStates);
  // const [initMessageList, setMessageList] = React.useState<BulletNoteState['messageList']>([]);

  const handleSetFirebaseDataToLS = useCallback((_userId: string) => {
    readFromDB({
      userId: _userId,
      successCb: (rawData) => {
        HandleDataInLocalStorage.setDataFromRawData(rawData);
        setState(s => ({
          ...s,
          loading: false,
        }));
        // window.location.reload();
      },
      errorCb: (error) => {
        setState(s => ({
          ...s,
          error,
          loading: false,
        }));
      }
    });
  }, []);

  const handleSetConfigFromLS = useCallback(() => {
    const LSData = ConfigLocalStorageHandler.getData();
    initBulletNoteConfigFromLS(LSData);
  }, [initBulletNoteConfigFromLS]);

  React.useEffect(() => {
    handleSetConfigFromLS();
  }, [handleSetConfigFromLS]);

  React.useEffect(() => {

    //dev mode get localstorage data directly
    if(process.env.NODE_ENV === 'development') {
      return;
    }
    //init check local and online  
    HandleDataInLocalStorage.initCheckLocalWithOnlineLS();
    const LSdata = HandleDataInLocalStorage.getData();
    const isHaveLSdata = LSdata && LSdata.length > 0;
    const isOfflineMode = userId === offLineModeParam;

    if(isOfflineMode && isHaveLSdata) {
      setState(s => ({
        ...s,
        isOffline: true,
        loading: false,
      }));
    } else {
      setState(s => ({
        ...s, loading: true
      }));
      handleSetFirebaseDataToLS(userId);
    }
  }, [handleSetFirebaseDataToLS, userId]);



  return ({
    ...state,
  });
};

const BulletNotePage = (props: BulletNotePageProps) => {
  const classes = useStyles();

  const {
    loading,
    error,
    isOffline,
  } = useBulletNotePage(props);

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
    <>
      <NavBarContainer
        isOffline={isOffline} />
      <Container className={classes.container}>
        <Box className={classes.root}>
          <Box 
            className={classes.notePart}
          >
            <NotePartContainerWithCtx
            />
          </Box>
          <Box className={classes.inputPart}>
            <InputPartContainerWithCtx />
          </Box>
        </Box>
      </Container>
    </>
  );
};

interface OwnProps {

}

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  // addShowingDaysRange: BulletNotePageProps['addShowingDaysRange']
  initBulletNoteConfigFromLS: BulletNotePageProps['initBulletNoteConfigFromLS']
}> = (dispatch) => {
  return ({
    // addShowingDaysRange: (daysRange=1) => {
    //   const action = addDaysRange(daysRange);
    //   dispatch(action);
    // },
    initBulletNoteConfigFromLS: (bulletNoteConfig) => {
      const action = setBulletNoteConfig(bulletNoteConfig);
      dispatch(action);
    }
  });
};


const BulletNotePageWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(BulletNotePage);

export default BulletNotePageWithCtx;