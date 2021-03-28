import React from 'react';
import { Assets } from '../../assets';
import Icon from '../Icon/Icon';
import { StyledRetweetHeader } from './styles';

const RetweetHeader = ({ tweet }) => {
  return (
    <StyledRetweetHeader>
      <Icon
        icon={Assets.Pictures.Retweet}
        size={18}
        style={{ cursor: 'initial', marginRight: 5 }}
      />
      <p>
        <b>{tweet.user.name}</b> retweeted:
      </p>
    </StyledRetweetHeader>
  );
};

export default RetweetHeader;
