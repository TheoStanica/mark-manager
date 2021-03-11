import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import { isLoggedin } from '../../services/isLoggedIn';
import './Home.css';

const Home = () => {
  return isLoggedin() ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="home" style={{ width: '100%' }}>
      <Header className="normal" />
      <div className=" home-wrapper d-flex flex-column justify-content-center align-items-center">
        <h1>Welcome to Project Mark!</h1>
        <Button className="mb-1 mt-1">
          <Link to="/login">Login</Link>
        </Button>
        <div className="soon">More coming soon...</div>
      </div>
    </div>
  );
};

export default Home;
