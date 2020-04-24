import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { MapDispatchToProps, MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { DaysRangeInputProps, DaysRangeInputWithCtxProps } from './types';
import useChangeInput from 'lib/customHooks/useChangeInput';
import { setDaysRange } from 'BulletNote/actions/config-actions';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';

const DaysRangeInput = (props: DaysRangeInputProps) => {
  const {
    initDaysRange,
    setDaysRangeToCtx,
  } = props;

  const {
    value,
    handleChange,
  } = useChangeInput({
    initValue: initDaysRange, 
    cb: setDaysRangeToCtx,
    cbTimeout: 300,
  });

  return (
    <TextField 
      label={'設定顯示天數範圍'}
      variant={'outlined'}
      type={'number'}
      value={value}
      onChange={handleChange}
    />
  );
};

const mapDispatchToProps: MapDispatchToProps<DaysRangeInputWithCtxProps, {
  setDaysRangeToCtx: DaysRangeInputProps['setDaysRangeToCtx']
}> = (dispatch) => {
  return ({
    setDaysRangeToCtx: (daysRange) => {
      const action = setDaysRange(daysRange);
      dispatch(action);
    }
  });
};

const mapStateToProps: MapStateToProps<BulletNoteState, DaysRangeInputWithCtxProps, {
  initDaysRange: number
}> = (state) => {
  return ({
    initDaysRange: state.bulletNoteConfig.showingDaysRange
  });
};


const DaysRangeInputWithCtx = connectCtx(ContextStore)(mapStateToProps, mapDispatchToProps)(DaysRangeInput);

export default DaysRangeInputWithCtx;