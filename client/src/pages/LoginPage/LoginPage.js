import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import AuthSplash from '../../components/AuthSplash/AuthSplash';
import Login from '../../components/Login/Login';
import { isLoggedin } from '../../services/isLoggedIn';

const LoginPage = () => {
  useSelector((state) => state.userReducer.present.accessToken);

  return isLoggedin() ? (
    <Redirect to="/dashboard" />
  ) : (
    <AuthSplash>
      <Login />
    </AuthSplash>
  );
};

export default LoginPage;
