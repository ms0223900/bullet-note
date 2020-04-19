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

const SyncToFirebase = (props: SyncToFirebaseProps) => {
  const {
    messageList,
  } = props;
  const {
    userId,
  } = useParams<{ userId: string }>();
  const jsonizedData = JSON.stringify(messageList);

  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState();
  const [syncSuccess, setSuccess] = useState(false);

  const handleSyncSuccess = useCallback(() => {
    setLoading(false);
    setSuccess(true);
  }, []);
  
  const handleSyncData = useCallback(() => {
    if(!syncSuccess) {
      console.log(messageList);
      const data = HandleDataInLocalStorage.getData();
      setLoading(true);
      writeWholeDataToDB({
        userId,
        data,
        successCb: handleSyncSuccess,
        errorCb: (err: any) => setErr(err),
      });
    }
  }, [handleSyncSuccess, messageList, syncSuccess, userId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSyncData();
    }, syncTimeout * 1000);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [handleSyncData]);

  useEffect(() => {
    setSuccess(false);
  }, [jsonizedData]);

  if(loading) {
    return <CircularProgress />;
  }

  if(error) {
    return (
      <Typography>
        {'Check your login and network.'}
      </Typography>
    );
  }
  
  return (
    <>
      <Button
        onClick={handleSyncData}
      >
        {'Sync'}
      </Button>
      {syncSuccess && 'Sync success'}
    </>
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