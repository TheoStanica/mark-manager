import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import SettingsPage from './pages/SettingsPage';
import ActivateAccount from './pages/ActivateAccount';
import PrivateRoute from './components/PrivateRoute';
import TwitterConnect from './pages/TwitterConnect';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <div className="container">
            <Switch>
              <Route path="/" exact component={() => <Home />} />
              <Route
                path="/activate/:id"
                component={() => <ActivateAccount />}
              />
              <PrivateRoute path="/register" redirectIfLoggedIn={true}>
                <Register />
              </PrivateRoute>
              <PrivateRoute path="/login" redirectIfLoggedIn={true}>
                <Login />
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
