import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { UserNotFoundPageProps } from './types';

const UserNotFoundPage = ({
  errorMessage,
}: UserNotFoundPageProps) => {
  return (
    <Box>
      <Typography>
        {errorMessage}
      </Typography>
      <Button href={'/'}>
        {'Home'}
      </Button>
    </Box>
  );
};

export default UserNotFoundPage;