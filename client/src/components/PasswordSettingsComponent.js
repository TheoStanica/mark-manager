import React, { useState } from 'react';
import axiosInstance from '../api/buildClient';

const PasswordSettingsComponent = ({ user }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit form');
    if (newPassword !== repeatNewPassword) {
      setErrors(
        <div className="alert alert-danger">Passwords do not match</div>
      );
    } else {
      try {
        await axiosInstance.put('/api/auth/changepassword', {
          currentPassword: oldPassword,
          newPassword: newPassword,
        });
        setMessage(
          <div className="alert alert-success">Password Changed!</div>
        );
        setErrors('');
      } catch (err) {
        setErrors(
          <div className="alert alert-danger">
            <ul>
              {err.response.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
      }
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
                <label htmlFor="inputFullname">Old Password</label>
                <input
                  className="form-control"
                  id="inputOldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputNewPassword">New Password</label>
                <input
                  className="form-control"
                  id="inputNewPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputRepeatNewPassword">
                  Repeat New Password
                </label>
                <input
                  className="form-control"
                  id="inputRepeatNewPassword"
                  type="password"
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
        {errors}
        {message}
      </div>
    </div>
  );
};

export default PasswordSettingsComponent;
