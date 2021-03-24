import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import ErrorDisplay from '../DisplayErrors';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import {
  StyledLoginDiv,
  StyledHeader,
  StyledSmallText,
  StyledErrors,
} from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submitLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <StyledLoginDiv>
      <StyledHeader>Login</StyledHeader>
      <form className="" onSubmit={submitLogin}>
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          minLength={6}
        />
        <StyledSmallText style={{ marginBottom: '2rem' }}>
          <Link to="/password/reset" className="me-3">
            Forgot password?
          </Link>
        </StyledSmallText>
        <Button type="submit" style={{ marginBottom: '1rem' }}>
          Sign In
        </Button>
        <StyledSmallText style={{ marginBottom: '1rem' }}>
          Don't have an account?
          <Link to="/register" className="ml-05">
            Sign Up
          </Link>
        </StyledSmallText>
        <StyledErrors>
          <ErrorDisplay />
        </StyledErrors>
      </form>
    </StyledLoginDiv>
  );
};

export default Login;
