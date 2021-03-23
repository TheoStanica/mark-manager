import React from 'react';
import { Assets } from '../../assets';
import Header from '../Header/Header';
import { SplashDiv, Background, BackgroundText } from './styles';

const AuthSplash = ({ children }) => {
  return (
    <>
      <Header />
      <SplashDiv>
        {children}
        <Background>
          <img src={Assets.Pictures.AuthSplash} alt="background splash" />
          <BackgroundText>Project Mark</BackgroundText>
        </Background>
      </SplashDiv>
    </>
  );
};

export default AuthSplash;
