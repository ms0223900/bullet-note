import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import SyncToFirebaseWithCtx from 'BulletNote/containers/SyncToFirebase';
import { NavBarProps } from './types';
import { offLineModeParam } from 'BulletNote/config';

export const navHeight = 32;

const NavBar = (props: NavBarProps) => {
  const {
    isOffline
  } = props;
  
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      height={navHeight}
      style={{
        backgroundColor: '#bca1ed'
      }}
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
        <Button color={'primary'} href={`/bullet-note/${offLineModeParam}`}>
          {'Offline-mode'}
        </Button>
      )}
    </Box>
  );
};

export default NavBar;