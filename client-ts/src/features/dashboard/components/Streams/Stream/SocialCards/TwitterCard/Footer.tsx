import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import {
  ILikeTweetMutation,
  IRetweetTweetMutation,
  ITweet,
} from '../../../../../../../api/twitter/types';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
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

interface Props {
  tweet: ITweet;
  isRetweet: boolean;
  stream: IStreamPreference<ITwitterStreamData>;
}

const Footer = ({ tweet, isRetweet, stream }: Props) => {
  const [likeTweet] = useLikeTweetMutation();
  const [retweetTweet] = useRetweetTweetMutation();

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
        search: stream.data.search!,
        twitterUserId: stream.data.twitterUserId,
      },
    };
    retweetTweet(data);
  }, [tweet, stream, retweetTweet]);

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
