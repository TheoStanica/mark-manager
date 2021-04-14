import React from 'react';
import Icon from '../Icon/Icon';
import { StyledRetweetHeader } from './styles';
import Retweet from '../../assets/Pictures/Retweet';

const RetweetHeader = ({ tweet }) => {
  return (
    <StyledRetweetHeader>
      <Icon size={18} style={{ cursor: 'initial', marginRight: 5 }}>
        <Retweet color="#000" />
      </Icon>
      <p>
        <b>{tweet.user.name}</b> retweeted:
      </p>
    </StyledRetweetHeader>
  );
};

export default RetweetHeader;
