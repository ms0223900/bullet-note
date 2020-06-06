import React from 'react';
import { Box, FormControlLabel, Checkbox } from '@material-ui/core';
import { TagWholePageDateTagToggleProps } from './types';

const TagWholePageDateTagToggle = (props: TagWholePageDateTagToggleProps) => {
  return (
    <FormControlLabel 
      label={'隱藏日期分隔線'}
      control={
        <Checkbox 
          {...props}
          color={'primary'}
        />
      }
    />
  );
};

export default TagWholePageDateTagToggle;