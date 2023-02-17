import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useSnackbar, VariantType } from 'notistack';
import { RootState } from '../store/store';
import TextInput from '../components/basics/inputs/TextInput';
import PasswordInput from '../components/basics/inputs/PasswordInput';
import { authActions } from '../store/auth/auth';
import { userActions } from '../store/user/user';
import theme from '../theme/theme';
import signInUser from '../services/signInUser';
import saveToLocalStorage from '../services/localStorage/saveToLocalStorage';
import readFromLocalStorage from '../services/localStorage/readFromLocalStorage';

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const checkboxChangeHandler = () => {
    setRememberMe(!rememberMe);
  };

  const username = useSelector<RootState, string>(
    (state) => state.auth.username,
  );
  const password = useSelector<RootState, string>(
    (state) => state.auth.password,
  );

  const setUsername = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(authActions.setUsername(event.target.value));
  };

  const setPassword = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(authActions.setPassword(event.target.value));
  };

  const setIsAuthenticated = (value: boolean) => {
    dispatch(authActions.setIsAuthenticated(value));
  };

  const setUserId = (id: number) => {
    dispatch(userActions.setUserId(id));
  };

  const handleAlert = (msgVariant: VariantType, msgDesc: string) => {
    enqueueSnackbar(msgDesc, {
      variant: msgVariant,
      preventDuplicate: true,
      autoHideDuration: 4000,
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
    });
  };

  const submitHandler = async (usr: string, pwd: string) => {
    const response = await signInUser(usr, pwd);

    if (response.status === 200) {
      handleAlert('success', 'Signed in successfully.');
      setIsAuthenticated(true);
      setUserId(response.data.id);

      if (rememberMe) {
        saveToLocalStorage({ username: usr, password: pwd });
      }

      navigate('/');
    } else {
      handleAlert('error', response.data);
    }
  };

  useEffect(() => {
    const signInCredentials = readFromLocalStorage();

    if (signInCredentials !== null) {
      submitHandler(
        signInCredentials.username,
        signInCredentials.password,
      ).then();
    }
  }, []);

  return (
    <Box
      sx={{
        minWidth: '100vw',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '150vw',
          height: '100vh',
          transform: 'rotate(-15deg)',
          position: 'absolute',
          bottom: '42%',
          left: '-36%',
          backgroundColor: theme.palette.primary.main,
          zIndex: '-2',
        }}
      >
        <Box
          sx={{
            width: '1040px',
            height: '40px',
            transform: 'skew(-15deg)',
            backgroundColor: purple[200],
            marginBottom: '-40px',
          }}
        />

        <Box
          sx={{
            width: '840px',
            height: '40px',
            transform: 'skew(-15deg)',
            backgroundColor: purple[200],
          }}
        />
      </Box>

      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '560px' },
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          paddingX: { xs: '18px', sm: '68px' },
          paddingY: { xs: '26px', sm: '56px' },
        }}
        elevation={3}
      >
        <Typography variant="h5" component="h5">
          Sign in to your account
        </Typography>

        <TextInput
          id="username-inp"
          label="Username"
          value={username}
          onChange={setUsername}
        />

        <PasswordInput
          id="password-inp"
          label="Password"
          password={password}
          onChange={setPassword}
        />

        <FormGroup sx={{ marginTop: '-25px' }}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{ fontSize: '30px' }}
                checked={rememberMe}
                onChange={checkboxChangeHandler}
              />
            }
            label="Remember Me"
          />
        </FormGroup>

        <Button
          variant="contained"
          size="large"
          onClick={() => submitHandler(username, password)}
        >
          Sign In
        </Button>

        <Box
          sx={{ display: 'flex', justifyContent: 'end', marginTop: '-15px' }}
        >
          <Typography>
            <Link
              href="https://dummyjson.com/users"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              Forgot your password?
            </Link>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px',
          }}
        >
          <Typography variant="caption" display="block" gutterBottom>
            Copyright ©&nbsp;
            <Link
              href="https://sveikauskas.dev"
              style={{ textDecoration: 'none' }}
            >
              Audrius Šveikauskas
            </Link>
            &nbsp;2023.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignIn;
