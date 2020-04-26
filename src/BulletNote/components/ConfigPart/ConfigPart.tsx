import React from 'react';
import { Box, Typography, Divider } from '@material-ui/core';
import DaysRangeInputWithCtx from 'BulletNote/containers/ConfigPart/DaysRangeInput';
import DownloadMessageListWithCtx from '../DownloadMessageList';
import RestoreBackup from '../RestoreBackup';

const ConfigPart = () => {
  return (
    <Box
      padding={1}
      minWidth={200}
      height={'100%'}
    >
      <Typography variant={'h6'}>
        {'Config'}
      </Typography>
      <Divider />
      <Box
        display={'flex'}
        paddingTop={2}
        flexDirection={'column'}
        justifyContent={'space-between'}
        height={'100%'}
      >
        <DaysRangeInputWithCtx />
        <Box
          // display={'flex'}
          maxWidth={200}
          overflow={'hidden'}
        >
          <Divider />
          <DownloadMessageListWithCtx />
          <RestoreBackup />
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigPart;