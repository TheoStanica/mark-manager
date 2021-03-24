import React from 'react';
import twitter from 'twitter-text';
import { StyledMessage } from './styles';

const TweetMessage = ({ tweet }) => {
  let { full_text, entities } = tweet;

  // replace links
  full_text = twitter.autoLinkWithJSON(full_text, entities);

  // remove Image Link
  if (entities && entities.media) {
    entities.media.forEach((element) => {
      full_text = full_text.replace(element.display_url, '');
    });
  }

  return (
    <StyledMessage
      dangerouslySetInnerHTML={{
        __html: full_text,
      }}
    ></StyledMessage>
  );
};

export default TweetMessage;
