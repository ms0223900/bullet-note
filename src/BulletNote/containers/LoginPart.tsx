import React, { useCallback } from 'react';
import { Box, TextField, Button, Container, Typography } from '@material-ui/core';
import useForm from '../../lib/customHooks/useForm';
import { useHistory } from 'react-router';
import handleLogInToFirebase from 'BulletNote/functions/SignAndLog/handleLogInToFirebase';

const LoginPart = () => {
  const history = useHistory();
  const [error, setError] = React.useState({
    message: ''
  });

  const {
    form,
    handleChangeForm,
  } = useForm({
    email: {
      label: 'email',
      value: '',
    },
    password: {
      label: 'password',
      value: '',
    },
  });

  const handleLogIn = useCallback(() => {
    console.log(form);
    handleLogInToFirebase({
      email: form.email.value,
      password: form.password.value,
      successCb: (userId: string) => history.push(`/bullet-note/${userId}`),
      errorCb: setError,
    });
  }, [form, history]);

  return (
    <Container>

      <Box
        padding={1}
        textAlign={'center'}
      >
        <Box
          paddingBottom={1}
          textAlign={'center'}
        >
          <TextField 
            id={'email'}
            name={'email'}
            variant={'outlined'}
            type={'email'}
            label={'email'}
            onChange={handleChangeForm}
          />
        </Box>
        <Box
          paddingBottom={1}
          textAlign={'center'}
        >
          <TextField 
            id={'password'}
            name={'password'}
            type={'password'}
            variant={'outlined'}
            label={'password'}
            onChange={handleChangeForm}
          />
        </Box>
        {error.message && (
          <Typography
            color={'error'}
          >
            {error.message}
          </Typography>
        )}
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={handleLogIn}
        >
          {'Log in'}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPart;