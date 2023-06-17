import React, { useMemo } from 'react';
import {
  ISearchTweetsResponseExtended,
  ITweet,
} from '../../../../../../../api/twitter/types';
import twitter from 'twitter-text';
import Photo from './Photo';
import { useGetSummaryMutation } from '../../../../../../../api/ml';
import { Button, Card, CardContent, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../core/redux/store';
import {
  IStreamPreference,
  ITwitterStreamData,
} from '../../../../../../../api/user/types';
import useReferencedTweet from '../../../../../hooks/useReferencedTweet';

interface Props {
  stream: IStreamPreference<ITwitterStreamData>;
  tweet: ITweet;
  simple?: boolean;
}
const Content = ({ tweet, stream, simple }: Props) => {
  const [getSummary, { isLoading, data }] = useGetSummaryMutation();
  const { isRetweet } = useReferencedTweet({ tweet });

  const referencedTweet = useSelector((state: AppState) => {
    const _data = state.twitterApi.queries[stream.id]?.data as
      | ISearchTweetsResponseExtended
      | undefined;
    if (!_data) {
      return undefined;
    }
    if (
      tweet.referenced_tweets &&
      tweet.referenced_tweets.length > 0 &&
      tweet.referenced_tweets[0]?.id
    ) {
      return _data._realData.includes.tweets?.find(
        (_tweet) => _tweet.id === tweet.referenced_tweets![0].id
      );
    }
  });

  const message = useMemo(() => {
    if (isRetweet) {
      return referencedTweet?.text || '';
    }

    return tweet.text;
  }, [tweet, isRetweet, referencedTweet]);

  const text = useMemo(() => {
    let _message = message;
    // remove urls
    _message = _message.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

    let text = twitter.autoLink(_message, { usernameIncludeSymbol: true });
    return text.replace(
      /href=/g,
      `style="text-decoration: none;color:${
        simple ? 'gray' : '#1da1f2'
      };" href=`
    );
  }, [message, simple]);

  if (simple) {
    return (
      <div
        style={{ color: 'gray' }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        text.length > 120 && (
          <Button
            variant="text"
            onClick={() => {
              getSummary({ message: text });
            }}
          >
            {data?.length ? '' : 'Summarize text'}
          </Button>
        )
      )}
      {data?.length && (
        <Card elevation={0}>
          <CardContent>{data[0]}</CardContent>
        </Card>
      )}
      <Photo tweet={tweet} stream={stream} />
    </>
  );
};

export default Content;
