import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@material-ui/core';
import checkIsSignIn from 'BulletNote/functions/SignAndLog/checkIsSignIn';
import { useHistory } from 'react-router';
import { logInParam } from 'BulletNote/config';
import { AuthPageWrapperProps } from './types';

const AuthPageWrapper = (props: AuthPageWrapperProps) => {
  const history = useHistory();
  const [isAuthSuccess, setAuthSuccess] = useState(false);

  const handleAuthAndRedirect = useCallback((signInRes: boolean) => {
    if(signInRes) {
      return setAuthSuccess(true);
    }
    return history.push(`/${logInParam}`);
  }, [history]);

  React.useEffect(() => {
    checkIsSignIn(handleAuthAndRedirect);
  }, [handleAuthAndRedirect]);

  if(!isAuthSuccess) {
    return (
      <Typography variant={'h5'}>
        {'Authorizing...'}
      </Typography>
    );
  }

  return (
    <>
      {props.children}
    </>
  );
};

export default AuthPageWrapper;