import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import { ToggleDisplayWrapperProps } from './types';

const ToggleDisplayWrapper = (props: ToggleDisplayWrapperProps) => {
  return (
    <Box
      {...props}
      style={{
        display: props.isDisplay ? 'block': 'none',
      }}
    >
      {props.children}
    </Box>
  );
};

export default memo(ToggleDisplayWrapper);