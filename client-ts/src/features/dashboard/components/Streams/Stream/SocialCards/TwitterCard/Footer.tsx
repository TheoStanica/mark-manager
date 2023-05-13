import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ILikeTweetMutation,
  IRetweetTweetMutation,
  ITweet,
} from '../../../../../../../api/twitter/types';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PositiveIcon from '@mui/icons-material/SentimentVerySatisfied';
import NegativeIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Container } from '@mui/system';
import { StyleSheet } from '../../../../../../../core/types/stylesheet';
import {
  IStreamPreference,
  ITwitterStreamData,
} from '../../../../../../../api/user/types';
import {
  useLikeTweetMutation,
  useRetweetTweetMutation,
} from '../../../../../../../api/twitter';
import { useGetSentimentMutation } from '../../../../../../../api/ml';

interface Props {
  tweet: ITweet;
  isRetweet: boolean;
  stream: IStreamPreference<ITwitterStreamData>;
}

const Footer = ({ tweet, isRetweet, stream }: Props) => {
  const [likeTweet] = useLikeTweetMutation();
  const [retweetTweet] = useRetweetTweetMutation();
  const [getSentiment, { data }] = useGetSentimentMutation();

  const likes = useMemo(() => {
    if (isRetweet) {
      return tweet.retweeted_status?.favorite_count;
    }
    return tweet.favorite_count;
  }, [isRetweet, tweet]);

  const retweets = useMemo(() => {
    if (isRetweet) {
      return tweet.retweeted_status?.retweet_count;
    }
    return tweet.retweet_count;
  }, [isRetweet, tweet]);

  const isRetweeted = useMemo(() => {
    if (isRetweet) {
      return tweet.retweeted_status?.retweeted;
    }
    return tweet.retweeted;
  }, [isRetweet, tweet]);

  const isFavorited = useMemo(() => {
    if (isRetweet) {
      return tweet.retweeted_status?.favorited;
    }
    return tweet.favorited;
  }, [isRetweet, tweet]);

  const onLike = useCallback(() => {
    const data: ILikeTweetMutation = {
      streamId: stream.id,
      tweet: tweet,
      twitterStreamData: {
        type: stream.data.type,
        search: stream.data.search!,
        twitterUserId: stream.data.twitterUserId,
      },
    };
    likeTweet(data);
  }, [tweet, stream, likeTweet]);

  const onRetweet = useCallback(() => {
    const data: IRetweetTweetMutation = {
      streamId: stream.id,
      tweet: tweet,
      twitterStreamData: {
        type: stream.data.type,
        search: stream.data.search,
        twitterUserId: stream.data.twitterUserId,
      },
    };
    retweetTweet(data);
  }, [tweet, stream, retweetTweet]);

  const message = useMemo(() => {
    if (isRetweet) {
      return tweet.retweeted_status!.full_text;
    }
    return tweet.full_text;
  }, [isRetweet, tweet]);
  useEffect(() => {
    if (message) {
      getSentiment({ message });
    }
  }, [message, getSentiment]);

  return (
    <Container maxWidth={false} sx={styles().container}>
      <Box sx={styles().box}>
        <Tooltip title="Retweet" arrow>
          <IconButton size="small" onClick={onRetweet}>
            <ReplayIcon
              fontSize="small"
              htmlColor={isRetweeted ? '#17bf63' : undefined}
            />
          </IconButton>
        </Tooltip>
        {retweets}
      </Box>
      <Box sx={styles().box}>
        <Tooltip title="Favorite" arrow>
          <IconButton size="small" onClick={onLike}>
            <FavoriteIcon
              fontSize="small"
              htmlColor={isFavorited ? '#e0245e' : undefined}
            />
          </IconButton>
        </Tooltip>
        {likes}
      </Box>
      {data?.sentiment === 'Positive' && (
        <Box sx={styles().box}>
          <Tooltip title="Positive sentiment" arrow>
            <PositiveIcon fontSize="small" htmlColor="#17bf63" />
          </Tooltip>
        </Box>
      )}
      {data?.sentiment === 'Negative' && (
        <Box sx={styles().box}>
          <Tooltip title="Negative sentiment" arrow>
            <NegativeIcon fontSize="small" htmlColor="#e0245e" />
          </Tooltip>
        </Box>
      )}
    </Container>
  );
};

const styles = (): StyleSheet => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: '8px !important',
    paddingRight: '8px !important',
    gap: 2,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default Footer;
