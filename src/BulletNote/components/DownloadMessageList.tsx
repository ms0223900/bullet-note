import React from 'react';
import { Box, Button } from '@material-ui/core';
import { DownloadMessageListProps } from './types';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from '../constants/context';
import { connectCtx } from 'react-function-helpers';
import HandleDataInLocalStorage from 'BulletNote/functions/HandleDataInLocalStorage';

export const getJSONFile = (data: any) => {
  return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
};

export const getTimeStamp = () => new Date().toLocaleString();

const DownloadMessageList = (props: DownloadMessageListProps) => {
  const dataFromLS = HandleDataInLocalStorage.getData();
  const timeStamp = getTimeStamp();

  return (
    <Button
      href={getJSONFile(dataFromLS)}
      download={`bullet-note-backup-${timeStamp}.json`}
    >
      {'download backup'}
    </Button>
  );
};

const mapStateToProps: MapStateToProps<BulletNoteState, {}, {
  messageList: DownloadMessageListProps['messageList']
}> = (state) => {
  return ({
    messageList: state.messageList,
  });
};

const DownloadMessageListWithCtx = connectCtx(ContextStore)(mapStateToProps)(DownloadMessageList);

export default DownloadMessageListWithCtx;