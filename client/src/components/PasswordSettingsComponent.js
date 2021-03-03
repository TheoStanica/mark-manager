import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setErrors } from '../redux/actions/errorsActions';
import { changePassword } from '../redux/actions/userActions';
import DisplayUserMessages from './DisplayUserMessages';
import ErrorDisplay from './DisplayErrors';
import Card from './Card/Card';
import CardHeader from './Card/Card.Header';
import CardBody from './Card/Card.Body';
import InputField from './InputField/InputField';
import Button from './Button/Button';

const PasswordSettingsComponent = () => {
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const currentPasswordRef = useRef(null);
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
    if (currentPasswordRef.current.value === '') {
      dispatchErrors('Please enter your current password');
    } else if (
      newPasswordRef.current.value !== repeatPasswordRef.current.value ||
      newPasswordRef.current.value === ''
    ) {
      dispatchErrors('New Password does not match');
    } else {
      dispatch(
        changePassword({
          newPassword: newPasswordRef.current.value,
          currentPassword: currentPasswordRef.current.value,
        })
      );
    }
  };

  return (
    <Card className="w-100">
      <CardHeader className="no-border">Change Password</CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <InputField
            ref={currentPasswordRef}
            type="password"
            id="inputOldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            label="Current Password"
            minLength="6"
          />
          <InputField
            ref={newPasswordRef}
            type="password"
            id="inputNewPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label="New Password"
            minLength="6"
          />
          <InputField
            ref={repeatPasswordRef}
            type="password"
            id="inputRepeatNewPassword"
            value={repeatNewPassword}
            onChange={(e) => setRepeatNewPassword(e.target.value)}
            label="Repeat New Password"
            minLength="6"
          />
          <Button type="submit"> Save Changes</Button>
        </form>
        <ErrorDisplay />
        <DisplayUserMessages />
      </CardBody>
    </Card>
  );
};

export default PasswordSettingsComponent;
