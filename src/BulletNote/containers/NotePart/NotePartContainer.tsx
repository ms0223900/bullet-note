import React, { RefObject } from 'react';
import { Box } from '@material-ui/core';
import NotePart from '../../components/NotePart/NotePart';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { MapStateToProps, MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { connectCtx } from 'react-function-helpers';
import HandleDataInLocalStorage from 'BulletNote/functions/HandleDataInLocalStorage';
import { setMessageFromDB } from 'BulletNote/actions/message-actions';
import { NotePartProps } from 'BulletNote/components/types';

const NotePartContainer = (props: NotePartProps) => {
  const {
    setMessageFromDB
  } = props;

  React.useEffect(() => {
    setMessageFromDB();
  }, [setMessageFromDB]);

  return (
    <NotePart
      {...props} />
  );
};


interface OwnProps {
  notePartRef?: RefObject<HTMLDivElement>
}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, Omit<NotePartProps, 'setMessageFromDB'>> = (state) => {
  return ({
    noteMode: state.bulletNoteConfig.noteMode,
    messageList: state.messageList,
  });
};

const mapDispatchToProps: MapDispatchToProps<OwnProps, Omit<NotePartProps, 'messageList' | 'noteMode'>> = (dispatch) => {
  return ({
    setMessageFromDB: () => {
      const messageList = HandleDataInLocalStorage.getData();
      console.log(messageList);
      const action = setMessageFromDB(messageList);
      dispatch(action);
    }
  });
};

const NotePartContainerWithCtx = connectCtx(ContextStore)(mapStateToProps, mapDispatchToProps)(NotePartContainer);

export default NotePartContainerWithCtx;