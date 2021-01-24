import React from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SettingsPage from './components/SettingsPage';
import ActivateAccount from './components/ActivateAccount';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/login" component={() => <Login />} />
            <Route path="/register" component={() => <Register />} />
            <Route path="/dashboard" component={() => <Dashboard />} />
            <Route path="/settings" component={() => <SettingsPage />} />
            <Route path="/activate/:id" component={() => <ActivateAccount />} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
