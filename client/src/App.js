import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import axiosInstance from './api/buildClient';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get('/api/user/currentuser', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response) {
        setUserData(response.data.user);
      }
    } catch (err) {
      setUserData(null);
    }
  };

  const onUserChange = () => {
    getUser();
  };
  const onUserNotLoggedIn = () => {
    setUserData(null);
  };

  useEffect(() => {
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken')
    ) {
      getUser();
    }
  }, []);

  return (
    <Router>
      <div className="ui container">
        <Header
          user={userData}
          onUserNotLoggedIn={onUserNotLoggedIn}
          onUserCheckLoggedIn={onUserChange}
        />
        <Switch>
          <Route path="/" exact component={() => <Home user={userData} />} />

          <Route
            path="/login"
            component={() => (
              <Login user={userData} onUserChange={onUserChange} />
            )}
          />

          <Route path="/register" user={userData} component={Register} />

          <Route
            path="/dashboard"
            component={() => (
              <Dashboard
                user={userData}
                onUserNotLoggedIn={onUserNotLoggedIn}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
