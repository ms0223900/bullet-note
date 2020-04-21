import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { logInParam } from 'BulletNote/config';

const NotFoundPage = () => {
  return (
    <Box
      textAlign={'center'}
    >
      <Typography variant={'h5'}>
        {'Page Not Found, Try Links below'}
        
      </Typography>
      <Button href={`/`} color={'primary'} variant={'outlined'}>
        {'Home'}
      </Button>
    </Box>
  );
};

export default NotFoundPage;