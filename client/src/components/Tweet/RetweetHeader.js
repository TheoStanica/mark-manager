import React from 'react';
import Icon from '../Icon/Icon';
import { StyledRetweetHeader } from './styles';
import Retweet from '../../assets/Pictures/Retweet';
import { withTheme } from 'styled-components';

const RetweetHeader = ({ tweet, theme }) => {
  return (
    <StyledRetweetHeader>
      <Icon size={18} style={{ cursor: 'initial', marginRight: 5 }}>
        <Retweet color={theme.pref === 'dark' ? 'white' : 'black'} />
      </Icon>
      <p>
        <b>{tweet.user.name}</b> retweeted:
      </p>
    </StyledRetweetHeader>
  );
};

export default withTheme(RetweetHeader);
