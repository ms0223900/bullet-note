import React from 'react';
import { Box, Select, MenuItem } from '@material-ui/core';
import { NoteMode, BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import useSelectorSelect from 'lib/customHooks/useSelectorSelect';
import { NoteModeSelectorProps, NoteModeSelectorWithCtxProps } from './types';
import { MapDispatchToProps, MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { setNoteMode } from 'BulletNote/actions/config-actions';
import { connectCtx } from 'react-function-helpers';

export const initSelectValue = (init: NoteMode) => ({
  noteMode: init,
});
export const noteModeSelects: {
  value: NoteMode
  label: string
}[] = [
  {
    value: 'normal',
    label: 'normal',
  },
  {
    value: 'tag-whole-page',
    label: 'tag-whole-page',
  }
];




const NoteModeSelector = (props: NoteModeSelectorProps) => {
  const {
    initNoteMode,
    selectNoteModeToCtx,
  } = props;

  const {
    values,
    handleSelect,
  } = useSelectorSelect(
    initSelectValue(initNoteMode), 
    (val) => selectNoteModeToCtx(val.noteMode)
  );

  return (
    <Select
      value={values.noteMode}
      onChange={handleSelect('noteMode')}
    >
      {noteModeSelects.map((s) => (
        <MenuItem 
          key={s.value}
          value={s.value}
        >
          {s.label}
        </MenuItem>
      ))}
    </Select>
  );
};

interface OwnProps extends NoteModeSelectorWithCtxProps {}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, {
  initNoteMode: NoteModeSelectorProps['initNoteMode']
}> = (state) => {
  return ({
    initNoteMode: state.bulletNoteConfig.noteMode,
  });
};

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  selectNoteModeToCtx: NoteModeSelectorProps['selectNoteModeToCtx']
}> = (dispatch) => {
  return ({
    selectNoteModeToCtx: (noteMode) => {
      const action = setNoteMode(noteMode);
      dispatch(action);
    }
  });
};

const NoteModeSelectorWithCtx = connectCtx(ContextStore)(mapStateToProps, mapDispatchToProps)(NoteModeSelector);

export default NoteModeSelectorWithCtx;