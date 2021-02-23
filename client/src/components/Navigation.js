import React from 'react';
import { Route } from 'react-router-dom';
import ActivateAccount from '../pages/ActivateAccount';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import SettingsPage from '../pages/SettingsPage';
import TwitterConnect from '../pages/TwitterConnect';
import PrivateRoute from './PrivateRoute';

const Navigation = () => {
  return (
    <>
      <Route path="/" exact component={() => <Home />} />
      <Route path="/activate/:id" component={() => <ActivateAccount />} />
      {/* <PrivateRoute path="/register">
        <Register />
      </PrivateRoute>
      <PrivateRoute path="/login">
        <Login />
      </PrivateRoute> */}
      <Route path="/login" component={() => <Login />} />
      <Route path="/register" component={() => <Register />} />
      <PrivateRoute path="/password/reset">
        <ResetPassword />
      </PrivateRoute>
      <PrivateRoute path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute path="/settings">
        <SettingsPage />
      </PrivateRoute>
      <PrivateRoute path="/twitter/connect">
        <TwitterConnect />
      </PrivateRoute>
    </>
  );
};

export default Navigation;
