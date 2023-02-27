import React, { useMemo } from 'react';
import { ITweet } from '../../../../../../../api/twitter/types';
import twitter from 'twitter-text';
import Photo from './Photo';

interface Props {
  isRetweet: boolean;
  tweet: ITweet;
}
const Content = ({ isRetweet, tweet }: Props) => {
  const message = useMemo(() => {
    if (isRetweet) {
      return tweet.retweeted_status!.full_text;
    }
    return tweet.full_text;
  }, [isRetweet, tweet]);

  const entities = useMemo(() => {
    if (isRetweet) {
      return tweet.retweeted_status!.entities;
    }
    return tweet.entities;
  }, [isRetweet, tweet.entities, tweet.retweeted_status]);

  const text = useMemo(() => {
    let _message = message;
    if (entities?.media) {
      console.log('replacing the shit thing');
      entities.media.forEach((element) => {
        _message = _message.replace(element.url, '');
      });
    }
    // TODO handle quotes as well

    let text = twitter.autoLink(_message, { usernameIncludeSymbol: true });

    return text.replace(
      /href=/g,
      'style="text-decoration: none;color:#1da1f2;" href='
    );
  }, [message, entities]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <Photo media={tweet.entities.media} />
    </>
  );
};

export default Content;
