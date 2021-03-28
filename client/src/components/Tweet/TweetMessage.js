import React from 'react';
import twitter from 'twitter-text';
import { StyledMessage } from './styles';

const TweetMessage = ({ tweet }) => {
  let { full_text: text, entities } = tweet;

  // replace links and mentions
  text = twitter.autoLinkWithJSON(text, entities || {}, {
    usernameIncludeSymbol: true,
  });
  text = text.replace(
    /href=/g,
    'style="text-decoration: none;color:#1da1f2;" href='
  );

  // remove Image Link
  if (entities?.media) {
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
