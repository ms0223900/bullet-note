import React from 'react';
import { Box, Typography, Button, makeStyles, Drawer, Divider } from '@material-ui/core';
import SyncToFirebaseWithCtx from 'BulletNote/containers/SyncToFirebase';
import { NavBarProps } from './types';
import { offLineModeParam, myBulletNoteParam } from 'BulletNote/config';
import { MenuRounded } from '@material-ui/icons';
import ConfigPart from '../ConfigPart/ConfigPart';
import DownloadMessageListWithCtx from '../DownloadMessageList';
import RestoreBackup from '../RestoreBackup';
import FilterDoneCheckBoxWithCtx from 'BulletNote/containers/ConfigPart/FilterDoneCheckBox';

export const navHeight = 32;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    height: navHeight,
  }
}));

const NavBar = (props: NavBarProps) => {
  const {
    isOffline,
    isDrawerOpen,
    onToggleDrawer,
  } = props;
  const classes = useStyles();
  
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      className={classes.root}
    >
      <SyncToFirebaseWithCtx />
      {isOffline && (
        <Box
          display={'flex'}
          alignItems={'center'}
        >
          <Typography
            color={'textSecondary'}
          >
            {'Offline Mode Now '}
          </Typography>
          <Button color={'primary'} href={'/'}>
            {'Online-mode'}
          </Button>
        </Box>
      )}
      {!isOffline && (
        <Button color={'primary'} href={`/${myBulletNoteParam}/${offLineModeParam}`}>
          {'Offline-mode'}
        </Button>
      )}
      <Box>
        <FilterDoneCheckBoxWithCtx />
        <Button
          onClick={onToggleDrawer}
        >
          <MenuRounded />
        </Button>
      </Box>
      
      <Drawer anchor={'right'} open={isDrawerOpen} onClose={onToggleDrawer}>
        <ConfigPart />
      </Drawer>
    </Box>
  );
};

export default NavBar;