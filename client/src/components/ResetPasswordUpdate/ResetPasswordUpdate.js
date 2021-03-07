import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '../../hooks/useQuery';
import { setErrors } from '../../redux/actions/errorsActions';
import { userResetPassword } from '../../redux/actions/userActions';
import Button from '../Button/Button';
import DisplayErrors from '../DisplayErrors';
import DisplayUserMessages from '../DisplayUserMessages';
import InputField from '../InputField/InputField';
import './ResetPasswordUpdate.css';

const ResetPasswordUpdate = () => {
  const dispatch = useDispatch();
  const query = useQuery();

  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const newPasswordRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const dispatchErrors = (message) => {
    dispatch(
      setErrors({
        errors: [{ message: message }],
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newPasswordRef.current.value !== repeatPasswordRef.current.value ||
      newPasswordRef.current.value === ''
    ) {
      dispatchErrors('Passwords do not match');
    } else {
      dispatch(
        userResetPassword({ token: query.get('token'), password: newPassword })
      );
    }
  };

  return (
    <div className="password-reset-update">
      <h1 className="header mb-1">Set New Password</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          ref={newPasswordRef}
          id="inputNewPassword"
          type="password"
          minLength="4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          label="New Password"
        />

        <InputField
          ref={repeatPasswordRef}
          id="inputRepeatNewPassword"
          type="password"
          minLength="4"
          value={repeatNewPassword}
          onChange={(e) => setRepeatNewPassword(e.target.value)}
          label="Repeat New Password"
          className="mb-3"
        />
        <Button type="submit" className="mb-1">
          Save Changes
        </Button>
        <div className="messages">
          <DisplayErrors />
          <DisplayUserMessages />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordUpdate;
