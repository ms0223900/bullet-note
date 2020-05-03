import React from 'react';
import { Box, FormControlLabel, Checkbox } from '@material-ui/core';
import useToggle from 'BulletNote/functions/useToggle';
import { MapDispatchToProps, MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { FilterDoneCheckBoxProps } from './types';
import { toggleIsFilteringDone } from 'BulletNote/actions/config-actions';
import { BulletNoteState, ContextStore } from 'BulletNote/constants/context';
import { connectCtx } from 'react-function-helpers';

const FilterDoneCheckBox = (props: FilterDoneCheckBoxProps) => {
  const {
    initIsFilteringDone,
    setIsFilteringDoneToCtx,
  } = props;
  
  const {
    handleToggle,
    toggle,
  } = useToggle(initIsFilteringDone, setIsFilteringDoneToCtx);

  return (
    <FormControlLabel 
      label={'隱藏已完成'}
      control={
        <Checkbox 
          color={'primary'}
          onChange={handleToggle}
          checked={toggle}
        />
      }
    />
  );
};

interface OwnProps {}

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  setIsFilteringDoneToCtx: (isFilteringDone: boolean) => any
}> = (dispatch) => {
  return ({
    setIsFilteringDoneToCtx: (isFilteringDone) => {
      const action = toggleIsFilteringDone(isFilteringDone);
      dispatch(action);
    }
  });
};

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, {
  initIsFilteringDone: boolean
}> = (state) => {
  return ({
    initIsFilteringDone: state.bulletNoteConfig.isFilteringDone,
  });
};


const FilterDoneCheckBoxWithCtx = connectCtx(ContextStore)(mapStateToProps, mapDispatchToProps)(FilterDoneCheckBox);

export default FilterDoneCheckBoxWithCtx;