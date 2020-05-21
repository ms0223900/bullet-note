import React, { useCallback, RefObject } from 'react';
import { Box, makeStyles, Container, CircularProgress } from '@material-ui/core';
import ContextWrapper, { ContextStore } from './constants/context';
import InputPartContainerWithCtx from './containers/InputPart/InputPartContainer';
import NotePartContainerWithCtx from './containers/NotePart/NotePartContainer';
import './styles/style.scss';
import { useParams } from 'react-router';
import HandleDataInLocalStorage from './functions/HandleDataInLocalStorage';
import readFromDB from './functions/firebase/readFromDB';
import { offLineModeParam } from './config';
import NavBar, { navHeight } from './components/CommonComponents/NavBar';
import UserNotFoundPage from './components/CommonComponents/UserNotFoundPage';
import NavBarContainer from './containers/CommonComponents/NavBarContainer';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNotePageProps } from './types';
import { setDaysRange, addDaysRange } from './actions/config-actions';
import { connectCtx } from 'react-function-helpers';
import useScrollToUpdate from 'lib/customHooks/useScrollToUpdate';

const getTopOfNoteBlock = (ref: RefObject<HTMLDivElement>) => {
  let top = -Infinity;

  if(ref.current) {
    const {
      top: blockTop,
    } = ref.current.getBoundingClientRect();
    top = blockTop;
    // console.log(top);
  }
  
  return top;
};

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

const useBulletNotePage = () => {
  const {
    userId
  } = useParams<{ userId: string }>();

  console.log(userId);
  const [state, setState] = React.useState({
    loading: true,
    error: { message: '', },
    isOffline: false,
  });
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

  React.useEffect(() => {
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
      handleSetFirebaseDataToLS(userId);
    }
  }, [handleSetFirebaseDataToLS, userId]);

  return ({
    ...state,
  });
};

const BulletNotePage = (props: BulletNotePageProps) => {
  const {
    addShowingDaysRange,
  } = props;

  const classes = useStyles();
  const {
    loading,
    error,
    isOffline,
  } = useBulletNotePage();

  const {
    loading: loadingUpdating,
    domRef,
    handleScroll,
  } = useScrollToUpdate({
    updateCb: addShowingDaysRange,
  });
  console.log(loadingUpdating);

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
            onScroll={handleScroll}
          >
            <NotePartContainerWithCtx
              notePartRef={domRef}
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

interface OwnProps extends Omit<BulletNotePageProps, 'addShowingDaysRange'> {

}

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  addShowingDaysRange: BulletNotePageProps['addShowingDaysRange']
}> = (dispatch) => {
  return ({
    addShowingDaysRange: (daysRange=1) => {
      const action = addDaysRange(daysRange);
      dispatch(action);
    }
  });
};


const BulletNotePageWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(BulletNotePage);

export default BulletNotePageWithCtx;