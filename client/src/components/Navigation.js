import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Activate from '../pages/Activate/Activate';
import Dashboard from '../pages/Dashboard/Dashboard';
import Home from '../pages/Home/Home';
import ResetPassword from '../pages/ResetPassword';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import TwitterConnect from '../pages/TwitterConnect';
import PrivateRoute from './PrivateRoute';
import '../App.css';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const { themePreference } = useSelector((state) => state.userReducer.present);
  return (
    <Switch>
      <ThemeProvider theme={{ pref: themePreference }}>
        <Route path="/" exact component={() => <Home />} />
        <Route path="/activate/:id" component={() => <Activate />} />
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/password/reset">
          <ResetPassword />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/settings">
          <SettingsPage />
        </PrivateRoute>
        <PrivateRoute path="/twitter/connect">
          <TwitterConnect />
        </PrivateRoute>
      </ThemeProvider>
    </Switch>
  );
};

export default Navigation;
