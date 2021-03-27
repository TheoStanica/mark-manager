import React from 'react';
import TweetCard from './TweetCard';
import { StyledQuotedTweet } from './styles';

const TweetQuote = ({ data }) => {
  return (
    <StyledQuotedTweet>
      <TweetCard tweet={data} />
    </StyledQuotedTweet>
  );
};

export default TweetQuote;
