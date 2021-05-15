import React, { useState } from 'react';
import CardFooter from '../Card/CardFooter';
import Icon from '../Icon/Icon';
import { StyledTweetFooterContainer } from './styles';
import Retweet from '../../assets/Pictures/Retweet';
import Likes from '../../assets/Pictures/Likes';
import { withTheme } from 'styled-components';
import FilledLikes from '../../assets/Pictures/FilledLikes';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { likeTweet, retweetTweet } from '../../redux/actions/twitterActions';

const selectTwitterUserId = (streamId) =>
  createSelector(
    (state) => state?.twitterReducer?.streamsById[streamId]?.twitterUserId,
    (twitterUserId) => twitterUserId
  );

const TweetFooter = ({ tweet, streamId, theme }) => {
  const [isLiked, setIsLiked] = useState(tweet.favorited);
  const [isRetweeted, setIsRetweeted] = useState(tweet.retweeted);
  const twitterUserId = useSelector(selectTwitterUserId(streamId));
  const dispatch = useDispatch();

  const formatValue = (count) => {
    return Intl.NumberFormat('en-US', {
      maximumFractionDigits: 1,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(count);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(
      likeTweet({ twitterUserId, tweetId: tweet.id_str, isLiked: isLiked })
    );
    setIsLiked(!isLiked);
  };
  const handleRetweet = (e) => {
    e.stopPropagation();
    dispatch(
      retweetTweet({ twitterUserId, tweetId: tweet.id_str, isRetweeted })
    );
    setIsRetweeted(!isRetweeted);
  };

  return (
    <CardFooter style={{ padding: '.5rem' }}>
      <StyledTweetFooterContainer>
        <Icon
          size={18}
          tooltip={'Retweet'}
          position={'top-start'}
          offset={[0, 5]}
          onClick={handleRetweet}
        >
          {isRetweeted ? (
            <Retweet color="#17bf63" />
          ) : (
            <Retweet color={theme.pref === 'dark' ? 'white' : 'black'} />
          )}
        </Icon>
        <p
          style={{
            marginLeft: 5,
            marginRight: 20,
            fontWeight: 'bold',
            fontSize: '.9rem',
            color: isRetweeted
              ? '#17bf63'
              : theme.pref === 'dark'
              ? 'white'
              : 'black',
          }}
        >
          {formatValue(tweet.retweet_count)}
        </p>
        <Icon
          size={18}
          tooltip={'Like'}
          position={'top-start'}
          offset={[0, 5]}
          onClick={handleLike}
        >
          {isLiked ? (
            <FilledLikes color="#e0245e" />
          ) : (
            <Likes color={theme.pref === 'dark' ? 'white' : 'black'} />
          )}
        </Icon>
        <p
          style={{
            marginLeft: 5,
            fontWeight: 'bold',
            color: isLiked
              ? '#e0245e'
              : theme.pref === 'dark'
              ? 'white'
              : 'black',
            fontSize: '.9rem',
          }}
        >
          {formatValue(tweet.favorite_count)}
        </p>
      </StyledTweetFooterContainer>
    </CardFooter>
  );
};

export default withTheme(TweetFooter);
