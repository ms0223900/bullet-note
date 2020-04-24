import React from 'react';
import { Box, Typography, Divider } from '@material-ui/core';
import DaysRangeInputWithCtx from 'BulletNote/containers/ConfigPart/DaysRangeInput';

const ConfigPart = () => {
  return (
    <Box
      padding={1}
      minWidth={200}
    >
      <Typography variant={'h6'}>
        {'Config'}
      </Typography>
      <Divider />
      <Box
        paddingTop={2}
      >
        <DaysRangeInputWithCtx />
      </Box>
    </Box>
  );
};

export default ConfigPart;