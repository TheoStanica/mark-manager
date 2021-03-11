import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestPasswordReset } from '../../redux/actions/userActions';
import DisplayErrors from '../DisplayErrors';
import DisplayUserMessages from '../DisplayUserMessages';
import './ResetPasswordRequest.css';
import '../Header/Header.css';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';

const ResetpasswordRequest = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const requestReset = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset({ email }));
  };

  return (
    <div className="password-reset-request ">
      <h1 className="header mb-1">Reset Password</h1>
      <div className="">
        <form onSubmit={requestReset}>
          <InputField
            type="email"
            id="resetPassword"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            className="mb-3"
          />
          <Button type="submit" className="mb-1">
            Reset Password
          </Button>
          <div className="messages">
            <DisplayUserMessages />
            <DisplayErrors />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetpasswordRequest;
