import React from 'react';
import twitter from 'twitter-text';
import { StyledMessage } from './styles';

const TweetMessage = ({ tweet }) => {
  let { full_text: text, entities } = tweet;

  // replace links
  text = twitter.autoLinkWithJSON(text, entities);

  // remove Image Link
  if (entities && entities.media) {
    entities.media.forEach((element) => {
      text = text.replace(element.display_url, '');
    });
  }

  return (
    <StyledMessage
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    ></StyledMessage>
  );
};

export default TweetMessage;
