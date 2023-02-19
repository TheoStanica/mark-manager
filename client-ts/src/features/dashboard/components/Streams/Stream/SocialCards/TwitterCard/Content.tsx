import React, { useMemo } from 'react';
import { ITweet } from '../../../../../../../api/twitter/types';
import twitter from 'twitter-text';

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

  const text = useMemo(() => {
    const text = twitter.autoLink(message, { usernameIncludeSymbol: true });
    return text.replace(
      /href=/g,
      'style="text-decoration: none;color:#1da1f2;" href='
    );
  }, [message]);

  return <div dangerouslySetInnerHTML={{ __html: text }} />;
};

export default Content;
