import React from 'react';
import TweetPhoto from './TweetPhoto';

const TweetMedia = ({ entities }) => {
  const renderMedia = () => {
    switch (entities.media[0].type) {
      case 'photo':
        return <TweetPhoto media={entities.media[0]} />;
      default:
        return <div />;
    }
  };
  return <>{renderMedia()}</>;
};

export default TweetMedia;
