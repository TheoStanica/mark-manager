import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import DisplayErrors from '../../components/DisplayErrors';
import DisplayUserMessages from '../../components/DisplayUserMessages';
import InputField from '../../components/InputField/InputField';
import { registerUser } from '../../redux/actions/userActions';
import {
  StyledRegisterDiv,
  StyledHeader,
  StyledSmallText,
  StyledMessages,
} from './styles';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submitRegister = async (e) => {
    e.preventDefault();
    // dispatch(registerUser({ email, password }));
  };

  return (
    <StyledRegisterDiv>
      <StyledHeader>Register</StyledHeader>
      <form onSubmit={submitRegister}>
        <InputField
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <InputField
          id="passwrod"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          minLength={6}
          style={{ marginBottom: '3rem' }}
        />
        <Button type="submit" style={{ marginBottom: '1rem' }}>
          Register
        </Button>
        <StyledSmallText>
          Already have an account?
          <Link to="/login" style={{ marginLeft: '.5rem' }}>
            Sign In
          </Link>
        </StyledSmallText>
        <StyledMessages>
          {/* <DisplayErrors />
          <DisplayUserMessages /> */}
        </StyledMessages>
      </form>
    </StyledRegisterDiv>
  );
};

export default Register;
