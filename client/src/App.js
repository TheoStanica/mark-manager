import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './shared/redux/store';
import { Switch } from 'react-router-dom';
import Login from './features/Auth/pages/Login';
import Landing from './core/pages/Landing';
import { injectStore } from './api/apiBaseQuery';
import ApplicationRoute from './features/Auth/components/PrivateRoute';
// import Dashboard from '../src/pages/Dashboard/Dashboard';
import Register from './features/Auth/pages/Register';
import AppThemeProvider from './core/components/AppThemeProvider';
import ForgotPassword from './features/Auth/pages/ForgotPassword';
import Activate from './features/Auth/pages/Activate';
import ResetPassword from './features/Auth/pages/ResetPassword';
import Dashboard from './features/Dashboard/pages/Dashboard';
import Settings from './features/Settings/pages/Settings';
import { SnackbarProvider } from 'notistack';
import Planner from './features/Planner/pages/Planner';
import TwitterConnect from './features/ConnectSocialAccount/pages/TwitterConnect';
import { CssBaseline } from '@mui/material';

injectStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading</div>} persistor={persistor}>
        <SnackbarProvider maxSnack={3}>
          <AppThemeProvider>
            <CssBaseline enableColorScheme />
            <Router>
              <Switch>
                <ApplicationRoute path="/" exact onlyPublic>
                  <Landing />
                </ApplicationRoute>
                <ApplicationRoute path="/login" exact onlyPublic>
                  <Login />
                </ApplicationRoute>
                <ApplicationRoute path="/register" exact onlyPublic>
                  <Register />
                </ApplicationRoute>
                <ApplicationRoute
                  path="/activate/:activationToken"
                  exact
                  onlyPublic
                >
                  <Activate />
                </ApplicationRoute>
                <ApplicationRoute path="/forgotPassword" exact onlyPublic>
                  <ForgotPassword />
                </ApplicationRoute>
                <ApplicationRoute path="/password/reset" exact onlyPublic>
                  <ResetPassword />
                </ApplicationRoute>

                <ApplicationRoute path="/dashboard" exact>
                  <Dashboard />
                </ApplicationRoute>
                <ApplicationRoute path="/settings" exact>
                  <Settings />
                </ApplicationRoute>
                <ApplicationRoute path="/planner" exact>
                  <Planner />
                </ApplicationRoute>
                <ApplicationRoute path="/twitter/connect" exact>
                  <TwitterConnect />
                </ApplicationRoute>
              </Switch>
            </Router>
          </AppThemeProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
