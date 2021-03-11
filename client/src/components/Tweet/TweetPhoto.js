import React from 'react';

const TweetPhoto = ({ media }) => {
  return (
    <img
      className="w-100 mt-2"
      src={media.media_url}
      alt={'Tweet media content'}
    />
  );
};

export default TweetPhoto;
