import React, { useMemo } from 'react';
import { ITweet } from '../../../../../../../api/twitter/types';
import twitter from 'twitter-text';
import Photo from './Photo';
import { useGetSummaryMutation } from '../../../../../../../api/ml';
import { Button, Card, CardContent, CircularProgress } from '@mui/material';

interface Props {
  isRetweet: boolean;
  tweet: ITweet;
}
const Content = ({ isRetweet, tweet }: Props) => {
  const [getSummary, { isLoading, data }] = useGetSummaryMutation();

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
      {isLoading ? (
        <CircularProgress size={20} /> // Replace with your spinner component
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

      <Photo media={tweet.entities.media} />
    </>
  );
};

export default Content;
