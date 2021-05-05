import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import { isLoggedin } from '../../services/isLoggedIn';
import { StyledHome, StyledHomeWrapper } from './styles';

const Home = () => {
  return isLoggedin() ? (
    <Redirect to="/dashboard" />
  ) : (
    <StyledHome>
      <Header normal={true} />
      <StyledHomeWrapper>
        <h1>Welcome to Project Mark!...</h1>
        <Button style={{ marginBottom: '1rem', marginTop: '1rem' }}>
          <Link to="/login">Login</Link>
        </Button>
        <div className="soon">More coming soon...</div>
      </StyledHomeWrapper>
    </StyledHome>
  );
};

export default Home;
