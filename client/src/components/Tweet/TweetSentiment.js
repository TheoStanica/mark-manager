import React from 'react';
import { useSelector } from 'react-redux';
import FaceHappy from '../../assets/Pictures/FaceHappy';
import FaceNeutral from '../../assets/Pictures/FaceNeutral';
import FaceSad from '../../assets/Pictures/FaceSad';
import Icon from '../Icon/Icon';

const TweetSentiment = ({ tweetId, isReply }) => {
  const tweet = useSelector((state) =>
    isReply
      ? state.twitterRepliesReducer.repliesById[tweetId]
      : state.twitterReducer.tweetsById[tweetId]
  );

  const renderSentimentIcon = () => {
    switch (tweet.sentiment) {
      case 'positive':
        return <FaceHappy />;
      case 'neutral':
        return <FaceNeutral />;
      case 'negative':
        return <FaceSad />;
      default:
        return null;
    }
  };

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Icon
        size={18}
        tooltip={`${tweet.sentiment} sentiment`}
        position={'top-start'}
        style={{}}
      >
        {renderSentimentIcon()}
      </Icon>
    </div>
  );
};

export default TweetSentiment;
