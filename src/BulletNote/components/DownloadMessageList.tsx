import React from 'react';
import { Box, Button } from '@material-ui/core';
import { DownloadMessageListProps } from './types';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { BulletNoteState, ContextStore } from '../constants/context';
import { connectCtx } from 'react-function-helpers';

export const getJSONFile = (data: any) => {
  return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
};

const DownloadMessageList = (props: DownloadMessageListProps) => {
  const timeStamp = new Date().toLocaleString();
  return (
    <Button
      href={getJSONFile(props.messageList)}
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