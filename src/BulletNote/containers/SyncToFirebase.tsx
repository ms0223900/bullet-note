import React, { useCallback, useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { syncTimeout } from 'BulletNote/config';
import writeWholeDataToDB from 'BulletNote/functions/firebase/writeToDB';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { SyncToFirebaseProps } from './types';
import { connectCtx } from 'react-function-helpers';
import { useParams } from 'react-router';
import HandleDataInLocalStorage from 'BulletNote/functions/HandleDataInLocalStorage';
import { Check } from '@material-ui/icons';
import checkIsSignIn from 'BulletNote/functions/SignAndLog/checkIsSignIn';
import readFromDB from 'BulletNote/functions/firebase/readFromDB';
import { Callback } from 'common-types';
import { stringifyMessageList } from 'BulletNote/functions/stringifySingleMessage';

const refreshErrorMessage = 'Please switch to online mode or refresh page.';

export const checkLocalStorageDataWithOnlineData = ({
  onlineData,
  errorCb,
  successCb
}: {
  onlineData: any, 
  errorCb: Callback
  successCb: Callback
}) => {
  const LSdata = stringifyMessageList(HandleDataInLocalStorage.getData());
  const stringifiedOnlineData = stringifyMessageList(onlineData);
  const res = LSdata === stringifiedOnlineData;
  if(!res) {
    errorCb({
      message: refreshErrorMessage,
    });
  } else {
    HandleDataInLocalStorage.setCheckLocalWithOnlineLS(true);
    successCb();
  }
  return res;
};

const SyncToFirebase = (props: SyncToFirebaseProps) => {
  const {
    messageList,
  } = props;
  const syncTimes = React.useRef(0);
  const isFirstTimeCheckSync = syncTimes.current === 0;

  const {
    userId,
  } = useParams<{ userId: string }>();

  const jsonizedData = JSON.stringify(messageList);

  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState({
    message: ''
  });
  const [syncSuccess, setSuccess] = useState(false);

  const handleSyncSuccess = useCallback(() => {
    setLoading(false);
    setSuccess(true);
    syncTimes.current += 1;
  }, []);
  
  const handleSyncData = useCallback(() => {
    const isSameWithOnline = HandleDataInLocalStorage.getCheckLocalWithOnlineLS();
    const shouldSync = !syncSuccess && isSameWithOnline;

    if(shouldSync) {
      console.log(messageList);
      const data = HandleDataInLocalStorage.getData();
      setLoading(true);
      writeWholeDataToDB({
        userId,
        data,
        successCb: handleSyncSuccess,
        errorCb: (err: any) => {
          setErr(err);
          setLoading(false);
        },
      });
    }
    else if(isFirstTimeCheckSync) {
      checkIsSignIn((isSignIn, user) => {
        if(user) {
          readFromDB({
            userId: user.uid,
            successCb: (val) => {
              checkLocalStorageDataWithOnlineData({
                onlineData: val,
                errorCb: setErr,
                successCb: handleSyncSuccess
              });
            },
          });
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSyncSuccess, jsonizedData, syncSuccess, userId, isFirstTimeCheckSync]);

  useEffect(() => {
    const syncTimeoutTime = isFirstTimeCheckSync ? 0 : syncTimeout * 1000;
    console.log(syncTimes.current);
    const timeout = setTimeout(() => {
      handleSyncData();
    }, syncTimeoutTime);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [handleSyncData, isFirstTimeCheckSync]);

  useEffect(() => {
    setSuccess(false);
  }, [jsonizedData]);

  if(loading) {
    return <CircularProgress />;
  }
  
  return (
    <Box
      display={'flex'}
    >
      <Button
        onClick={handleSyncData}
      >
        {'Sync'}
      </Button>
      {error.message && (
        <Typography>
          {error.message}
        </Typography>
      )}
      {syncSuccess && (
        <Box
          display={'flex'}
          alignItems={'center'}
        >
          <Check />
          <Typography
            color={'textSecondary'}
          >
            {'Sync success'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

interface OwnProps {}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, SyncToFirebaseProps> = (state) => {
  return ({
    messageList: state.messageList
  });
};

const SyncToFirebaseWithCtx = connectCtx(ContextStore)(mapStateToProps)(SyncToFirebase);

export default SyncToFirebaseWithCtx;