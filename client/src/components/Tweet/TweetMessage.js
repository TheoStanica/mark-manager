import React from 'react';
import twitter from 'twitter-text';

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
    <p
      className="tweet-message"
      dangerouslySetInnerHTML={{
        __html: full_text,
      }}
    ></p>
  );
};

export default TweetMessage;
