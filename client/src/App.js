import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './pages/Home';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import ActivateAccount from './pages/ActivateAccount';
import PrivateRoute from './components/PrivateRoute';
import TwitterConnect from './pages/TwitterConnect';
import ResetPassword from './pages/ResetPassword';
import './App.css';
import AuthSplash from './components/AuthSplash/AuthSplash';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="full-page">
            <Switch>
              <Route path="/" exact component={() => <Home />} />
              <Route
                path="/activate/:id"
                component={() => <ActivateAccount />}
              />

              <PrivateRoute path="/password/reset" redirectIfLoggedIn={true}>
                <ResetPassword />
              </PrivateRoute>
              <PrivateRoute path="/register" redirectIfLoggedIn={true}>
                <AuthSplash>
                  <Register />
                </AuthSplash>
              </PrivateRoute>
              <PrivateRoute path="/login" redirectIfLoggedIn={true}>
                <AuthSplash>
                  <Login />
                </AuthSplash>
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
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
