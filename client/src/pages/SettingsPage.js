import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileSettingsComponent from '../components/ProfileSettingsComponent';
import PasswordSettingsComponent from '../components/PasswordSettingsComponent';

const SettingsPage = () => {
  useSelector((state) => state.userReducer.present);
  const [option, setOption] = useState('profile');

  const renderSection = () => {
    switch (option) {
      case 'profile':
        return <ProfileSettingsComponent />;
      case 'password':
        return <PasswordSettingsComponent />;
      default:
        return <ProfileSettingsComponent />;
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
