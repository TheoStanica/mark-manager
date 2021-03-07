import React from 'react';
import Header from '../Header/Header';
import './AuthSplash.css';

const AuthSplash = ({ children }) => {
  return (
    <>
      <Header />
      <div className="authsplash">
        {children}
        <div className="bg">
          <img src="/AuthSplashBg.svg" alt="background splash" />
          <div className="bg-text">Project Mark</div>
        </div>
      </div>
    </>
  );
};

export default AuthSplash;
