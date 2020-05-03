import React from 'react';
import { Box, Typography, Divider } from '@material-ui/core';
import DaysRangeInputWithCtx from 'BulletNote/containers/ConfigPart/DaysRangeInput';
import DownloadMessageListWithCtx from '../DownloadMessageList';
import RestoreBackup from '../RestoreBackup';
import TagsFilterWithCtx from 'BulletNote/containers/ConfigPart/TagsFilter';
import FilterDoneCheckBoxWithCtx from 'BulletNote/containers/ConfigPart/FilterDoneCheckBox';

const ConfigPart = () => {
  return (
    <Box
      padding={1}
      maxWidth={200}
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
        <Box>
          <DaysRangeInputWithCtx />
          <Box paddingY={1} />
          <TagsFilterWithCtx />
          <Box paddingBottom={1}>
            <FilterDoneCheckBoxWithCtx />
          </Box>
        </Box>
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