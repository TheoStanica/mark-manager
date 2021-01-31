import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setErrors } from '../redux/actions/errorsActions';
import { changePassword } from '../redux/actions/userActions';
import DisplayUserMessages from './DisplayUserMessages';
import ErrorDisplay from './DisplayErrors';

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
    <div className="card">
      <div className="card-header">Change Password</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col mb-2">
              <div className="form-group">
                <label htmlFor="inputFullname">Current Password</label>
                <input
                  ref={currentPasswordRef}
                  className="form-control"
                  id="inputOldPassword"
                  type="password"
                  minLength="4"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputNewPassword">New Password</label>
                <input
                  ref={newPasswordRef}
                  className="form-control"
                  id="inputNewPassword"
                  type="password"
                  minLength="4"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputRepeatNewPassword">
                  Repeat New Password
                </label>
                <input
                  ref={repeatPasswordRef}
                  className="form-control"
                  id="inputRepeatNewPassword"
                  type="password"
                  minLength="4"
                  value={repeatNewPassword}
                  onChange={(e) => setRepeatNewPassword(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Save Changes
          </button>
        </form>
        <ErrorDisplay />
        <DisplayUserMessages />
      </div>
    </div>
  );
};

export default PasswordSettingsComponent;
