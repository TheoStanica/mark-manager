import React from 'react';
import twitter from 'twitter-text';

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
    <p
      className="tweet-message"
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    ></p>
  );
};

export default TweetMessage;
