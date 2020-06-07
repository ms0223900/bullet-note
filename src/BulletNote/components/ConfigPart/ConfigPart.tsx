import React from 'react';
import { Box, Typography, Divider, Button } from '@material-ui/core';
import DaysRangeInputWithCtx from 'BulletNote/containers/ConfigPart/DaysRangeInput';
import DownloadMessageListWithCtx from '../DownloadMessageList';
import RestoreBackup from '../RestoreBackup';
import TagsFilterWithCtx from 'BulletNote/containers/ConfigPart/TagsFilter';
import NoteModeSelectorWithCtx from 'BulletNote/containers/ConfigPart/NoteModeSelector';
import CLearLSButton from 'BulletNote/containers/ConfigPart/ClearLSButton';
import DueDateButtonContainerWithCtx from 'BulletNote/containers/ConfigPart/DueDateButtonContainer';
import SearchPartContainerWithCtx from 'BulletNote/containers/SearchPart/SearchPartContainer';
import { ConfigPartProps } from './types';
import { SettingsOutlined } from '@material-ui/icons';
import SettingPart from '../SettingPart/SettingPart';

const version = process.env.REACT_APP_VERSION;

const ConfigPart = (props: ConfigPartProps) => {
  const {
    isSettingOpen,
    onToggleSetting,
  } = props;

  const configHeader = (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
    >
      <Typography variant={'h6'}>
        {'Config'}
      </Typography>
      <Button
        onClick={onToggleSetting}
      >
        <SettingsOutlined />
      </Button>
    </Box>
  );

  const topPart = (
    <Box
    >
      <DaysRangeInputWithCtx />
      <Box paddingY={1} />
      <Box
        border={'1px solid #ddd'}
        borderRadius={8}
        padding={1}
        paddingBottom={2}
      >
        <TagsFilterWithCtx />
        <Box paddingBottom={1}>
          <NoteModeSelectorWithCtx />
        </Box>
      </Box>
      <Box paddingBottom={2} />
      <SearchPartContainerWithCtx />
      <Box paddingY={1} />
      <DueDateButtonContainerWithCtx />
    </Box>
  );

  const bottomPart = (
    <Box
      // display={'flex'}
      maxWidth={200}
      overflow={'hidden'}
    >
      <Divider />
      <CLearLSButton />
      <DownloadMessageListWithCtx />
      <RestoreBackup />
      <Divider />
      <Typography
        color={'textSecondary'}
      >
        {`v ${version}`}
      </Typography>
    </Box>
  );

  return (
    <Box
      padding={1}
      maxWidth={200}
      height={'100%'}
    >
      {configHeader}
      <Divider />
      <Box
        display={'flex'}
        paddingTop={2}
        flexDirection={'column'}
        justifyContent={'space-between'}
        height={'100%'}
      >
        {topPart}
        {bottomPart}
      </Box>
      <SettingPart 
        open={isSettingOpen}
        onClose={onToggleSetting}
      />
    </Box>
  );
};

export default ConfigPart;