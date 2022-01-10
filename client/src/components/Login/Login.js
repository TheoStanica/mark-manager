import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import ErrorDisplay from '../DisplayErrors';
import { Link, useHistory } from 'react-router-dom';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import {
  StyledLoginDiv,
  StyledHeader,
  StyledSmallText,
  StyledErrors,
} from './styles';
import { useLoginMutation, useLogoutMutation } from '../../api/auth/api';
import useAuthenticated from '../../features/Auth/hooks/useAuthenticated';
import { Box, TextField } from '@mui/material';
// import { authSlice } from '../../features/auth/slice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const { data, errpr, isLoading } = useLoginQuery(email, password);
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const a = useSelector((state) => state.authSlice);
  const authenticated = useAuthenticated();
  const history = useHistory();

  const submitLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  const onLogout = async () => {
    await logout();
  };

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) {
      history.push('/dashboard');
    }
  }, [isSuccess]);

  // console.log('AM I AUTHENTICATED? ', authenticated);

  return (
    <StyledLoginDiv>
      <StyledHeader>Login</StyledHeader>
      <form onSubmit={submitLogin}>
        <InputField
          id={'email'}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <InputField
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          minLength={6}
        />
        <StyledSmallText style={{ marginBottom: '2rem' }}>
          <Link to="/password/reset">Forgot password?</Link>
        </StyledSmallText>
        {error && <p>{error.data.errors[0].message}</p>}
        <Button type="submit" style={{ marginBottom: '1rem' }}>
          Sign In
        </Button>
        <StyledSmallText style={{ marginBottom: '1rem' }}>
          Don't have an account?
          <Link to="/register" style={{ marginLeft: '.5rem' }}>
            Sign Up
          </Link>
        </StyledSmallText>
        <div onClick={onLogout}>Logout</div>
        <StyledErrors>{/* <ErrorDisplay /> */}</StyledErrors>
      </form>
    </StyledLoginDiv>
  );

  // return <Box>{'shit'}</Box>;
};

export default Login;
