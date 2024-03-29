import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  ILikeTweetMutation,
  IRetweetTweetMutation,
  ITweet,
} from '../../../../../../../api/twitter/types';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PositiveIcon from '@mui/icons-material/SentimentVerySatisfied';
import NegativeIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import NeutralIcon from '@mui/icons-material/SentimentNeutral';
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
  stream: IStreamPreference<ITwitterStreamData>;
}

const Footer = ({ tweet, stream }: Props) => {
  const [likeTweet] = useLikeTweetMutation();
  const [retweetTweet] = useRetweetTweetMutation();
  const [getSentiment, { data }] = useGetSentimentMutation();

  const hasLiked = useRef(false);
  const hasRetweeted = useRef(false);

  const likes = useMemo(() => {
    return tweet.public_metrics.like_count;
  }, [tweet.public_metrics.like_count]);
  const retweets = useMemo(() => {
    return tweet.public_metrics.retweet_count;
  }, [tweet.public_metrics.retweet_count]);

  const onLike = useCallback(() => {
    if (hasLiked.current) {
      return;
    }
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
    hasLiked.current = true;
  }, [tweet, stream, likeTweet]);
  const onRetweet = useCallback(() => {
    if (hasRetweeted.current) {
      return;
    }
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
    hasRetweeted.current = true;
  }, [tweet, stream, retweetTweet]);
  const message = useMemo(() => {
    return tweet.text;
  }, [tweet]);
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
              htmlColor={hasRetweeted.current ? '#17bf63' : undefined}
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
              htmlColor={hasLiked.current ? '#e0245e' : undefined}
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
      {data?.sentiment === 'Neutral' && (
        <Box sx={styles().box}>
          <Tooltip title="Neutral sentiment" arrow>
            <NeutralIcon fontSize="small" htmlColor="#f5ce20" />
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
