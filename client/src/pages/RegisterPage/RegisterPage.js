import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import AuthSplash from '../../components/AuthSplash/AuthSplash';
import Register from '../../components/Register/Register';
import { isLoggedin } from '../../services/isLoggedIn';

const RegisterPage = () => {
  useSelector((state) => state.userReducer.present.accessToken);

  return isLoggedin() ? (
    <Redirect to="/dashboard" />
  ) : (
    <AuthSplash>
      <Register />
    </AuthSplash>
  );
};

export default RegisterPage;
