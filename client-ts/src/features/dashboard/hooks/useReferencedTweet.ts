import { useMemo } from 'react';
import { ITweet } from '../../../api/twitter/types';

interface Props {
  tweet: ITweet;
}
const useReferencedTweet = ({ tweet }: Props) => {
  const isRetweet = useMemo(() => {
    return (
      tweet.referenced_tweets &&
      tweet.referenced_tweets.length > 0 &&
      tweet.referenced_tweets[0].type === 'retweeted'
    );
  }, [tweet.referenced_tweets]);

  const isQuote = useMemo(() => {
    return (
      tweet.referenced_tweets &&
      tweet.referenced_tweets.length > 0 &&
      tweet.referenced_tweets[0].type === 'quoted'
    );
  }, [tweet.referenced_tweets]);

  const isReply = useMemo(() => {
    return (
      tweet.referenced_tweets &&
      tweet.referenced_tweets.length > 0 &&
      tweet.referenced_tweets[0].type === 'replied_to'
    );
  }, [tweet.referenced_tweets]);

  return { isQuote, isRetweet, isReply };
};

export default useReferencedTweet;
