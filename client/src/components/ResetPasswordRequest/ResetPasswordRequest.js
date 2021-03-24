import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestPasswordReset } from '../../redux/actions/userActions';
import DisplayErrors from '../DisplayErrors';
import DisplayUserMessages from '../DisplayUserMessages';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import { StyledHeader, StyledMessages, StyledPasswordReset } from './styles';

const ResetpasswordRequest = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const requestReset = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset({ email }));
  };

  return (
    <StyledPasswordReset>
      <StyledHeader>Reset Password</StyledHeader>
      <form onSubmit={requestReset}>
        <InputField
          type="email"
          id="resetPassword"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          style={{ marginBottom: '3rem' }}
        />
        <Button type="submit" style={{ marginBottom: '1rem' }}>
          Reset Password
        </Button>
        <StyledMessages>
          <DisplayUserMessages />
          <DisplayErrors />
        </StyledMessages>
      </form>
    </StyledPasswordReset>
  );
};

export default ResetpasswordRequest;
