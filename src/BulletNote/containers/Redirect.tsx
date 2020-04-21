import React from 'react';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router';
import checkIsSignIn from 'BulletNote/functions/SignAndLog/checkIsSignIn';
import { logInParam } from 'BulletNote/config';


const Redirect = () => {
  const history = useHistory();

  React.useEffect(() => {
    const redirectToUserPage = (signInRes: any, user: firebase.User) => {
      let userId = '';
      if(user) {
        userId = user.uid;
        history.push(`/bullet-note/${userId}`);
      } else {
        history.push(`/${logInParam}`);
      }
    };

    checkIsSignIn(redirectToUserPage);
  }, [history]);

  return (
    <Box>
      {'Redirecting...'}
    </Box>
  );
};

export default Redirect;