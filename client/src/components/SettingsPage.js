import React, { useEffect, useState } from 'react';

import ProfileSettingsComponent from './ProfileSettingsComponent';
import PasswordSettingsComponent from './PasswordSettingsComponent';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/actions/userActions';

const SettingsPage = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [option, setOption] = useState('profile');

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (!user.accessToken && !user.refreshToken) {
      return <Redirect to="/login" />;
    }
  }, [user]);

  const renderSection = () => {
    switch (option) {
      case 'profile':
        return <ProfileSettingsComponent user={user} />;
      case 'password':
        return <PasswordSettingsComponent user={user} />;
      default:
        return <ProfileSettingsComponent user={user} />;
    }
  };

  return (
    <div className="content">
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3">Settings</h1>
        <div className="row">
          <div className="col-md-3 col-xl-2">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Profile Settings</h5>
              </div>
              <div className="list-group list-group-flush" role="tablist">
                <button
                  className="list-group-item list-group-item-action"
                  onClick={() => setOption('profile')}
                >
                  Account
                </button>
                <button
                  className="list-group-item list-group-item-action"
                  onClick={() => setOption('password')}
                >
                  Password
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-xl-10">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
