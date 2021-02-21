import React, { useEffect, useState } from 'react';
import reactStringReplace from 'react-string-replace';

const TweetMessage = ({ tweet }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // find all links inside tweet.text string
    setLinks(
      tweet.text.match(
        /(https?:\/\/(?:www\.|(?!www))[^\s]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
      )
    );
  }, [tweet.text]);

  const renderTextMessage = () => {
    // replace string "links" with an actual link or image
    // does not seem like the best way to do this
    let finalMessage;
    if (links && links.length > 0) {
      links.map((link, idx) => {
        if (tweet.entities.media) {
          finalMessage = reactStringReplace(tweet.text, link, () => {
            return (
              <img
                className="w-100 mt-2"
                src={tweet.entities.media[idx].media_url}
                key={tweet.id}
                alt={`Tweet ${tweet.id}`}
              />
            );
          });
        }
        if (tweet.entities.urls.length > 0) {
          finalMessage = reactStringReplace(tweet.text, link, (match, i) => {
            return (
              <a
                key={(tweet.id, i)}
                href={match}
                target="_blank"
                rel="noreferrer"
              >
                {tweet.entities.urls[idx].display_url}
              </a>
            );
          });
        }
        return finalMessage;
      });
      return finalMessage;
    } else {
      return tweet.text;
    }
  };

  return <div className="mt-2">{renderTextMessage()}</div>;
};

export default TweetMessage;
