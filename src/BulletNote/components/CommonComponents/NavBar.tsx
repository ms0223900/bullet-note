import React from 'react';
import { Box, Typography, Button, makeStyles, Drawer } from '@material-ui/core';
import SyncToFirebaseWithCtx from 'BulletNote/containers/SyncToFirebase';
import { NavBarProps } from './types';
import { MenuRounded } from '@material-ui/icons';
import ConfigPart from '../ConfigPart/ConfigPart';
import FilterDoneCheckBoxWithCtx from 'BulletNote/containers/ConfigPart/FilterDoneCheckBox';
import { zIndexes } from 'BulletNote/theme/theme';
import SearchPartContainerWithCtx from 'BulletNote/containers/SearchPart/SearchPartContainer';

export const navHeight = 32;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky',
    top: 0,
    zIndex: zIndexes.navBar,
    backgroundColor: theme.palette.primary.light,
    minHeight: navHeight,
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
      {process.env.NODE_ENV === 'development' ? null : (
        <SyncToFirebaseWithCtx />
      )}
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
      
      {/* {!isOffline && (
        <Button color={'primary'} href={`/${myBulletNoteParam}/${offLineModeParam}`}>
          {'Offline-mode'}
        </Button>
      )} */}
      {/* <SearchPartContainerWithCtx /> */}
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