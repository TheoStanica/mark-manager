import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import { isLoggedin } from '../../services/isLoggedIn';
import { Pictures } from '../../assets/Pictures';
import {
  StyledHome,
  StyledHomeContainer,
  StyledTitle,
  StyledEmphasizedTitle,
  StyledColFlex,
  StyledTitleDescription,
  StyledEmphasizedTitleDescription,
  StyledImage,
  StyledSmallDescription,
} from './styles';

const Home = () => {
  return isLoggedin() ? (
    <Redirect to="/dashboard" />
  ) : (
    <StyledHome>
      <Header normal={true} />
      <StyledHomeContainer>
        <StyledColFlex>
          <StyledTitle>
            <StyledEmphasizedTitle>Engage</StyledEmphasizedTitle> with your
            audience!
          </StyledTitle>
          <StyledTitleDescription>
            <StyledEmphasizedTitleDescription>
              All
            </StyledEmphasizedTitleDescription>{' '}
            accounts.{' '}
            <StyledEmphasizedTitleDescription>
              One{' '}
            </StyledEmphasizedTitleDescription>
            place.
          </StyledTitleDescription>

          <Button
            style={{
              marginBottom: '1rem',
              marginTop: '2rem',
              alignSelf: 'start',
            }}
          >
            <Link to="/register">Register Now</Link>
          </Button>
        </StyledColFlex>
        <StyledImage src={Pictures.Engage} alt="Engage" />
      </StyledHomeContainer>
      <StyledHomeContainer color="#068abc" inverted={true}>
        <StyledImage src={Pictures.Opinions} alt="Opinions" />
        <StyledColFlex>
          <StyledTitle style={{ fontWeight: 'bold', color: 'white' }}>
            Find what your customers really think
          </StyledTitle>
          <StyledSmallDescription style={{ color: 'white' }}>
            Keep an eye on the latest social conversations, trends and brand
            mentions. Quickly respond to comments for all your connected
            accounts
          </StyledSmallDescription>
        </StyledColFlex>
      </StyledHomeContainer>
      <StyledHomeContainer>
        <StyledColFlex>
          <StyledTitle style={{ fontWeight: 'bold' }}>
            Connect all your social networks and never miss an event
          </StyledTitle>
        </StyledColFlex>
        <StyledImage src={Pictures.ConnectAccounts} alt="Connect" />
      </StyledHomeContainer>
    </StyledHome>
  );
};

export default Home;
