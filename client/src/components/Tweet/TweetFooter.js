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
import ReplyTweet from '../ReplyTweet/ReplyTweet';
import Reply from '../../assets/Pictures/Reply';
import TweetSentiment from './TweetSentiment';

const selectTwitterUserId = (streamId) =>
  createSelector(
    (state) => state?.twitterReducer?.streamsById[streamId]?.twitterUserId,
    (twitterUserId) => twitterUserId
  );

const TweetFooter = ({ tweetId, streamId, theme, isReply, isRetweet }) => {
  const tweet = useSelector((state) =>
    isReply
      ? state.twitterRepliesReducer.repliesById[tweetId]
      : state.twitterReducer.tweetsById[tweetId]
  );
  const twitterUserId = useSelector(selectTwitterUserId(streamId));
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      likeTweet({
        twitterUserId,
        isReply: isReply,
        tweet: tweet,
        isRetweet: isRetweet,
      })
    );
  };
  const handleRetweet = (e) => {
    e.stopPropagation();
    dispatch(
      retweetTweet({
        twitterUserId,
        isReply: isReply,
        tweet: tweet,
        isRetweet: isRetweet,
      })
    );
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
          {(isRetweet && tweet.retweeted_status.retweeted) ||
          tweet.retweeted ? (
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
            color: tweet.retweeted
              ? '#17bf63'
              : theme.pref === 'dark'
              ? 'white'
              : 'black',
          }}
        >
          {formatValue(
            isRetweet
              ? tweet.retweeted_status.retweet_count
              : tweet.retweet_count
          )}
        </p>
        <Icon
          size={18}
          tooltip={'Like'}
          position={'top-start'}
          offset={[0, 5]}
          onClick={handleLike}
        >
          {(isRetweet && tweet.retweeted_status.favorited) ||
          tweet.favorited ? (
            <FilledLikes color="#e0245e" />
          ) : (
            <Likes color={theme.pref === 'dark' ? 'white' : 'black'} />
          )}
        </Icon>
        <p
          style={{
            marginLeft: 5,
            marginRight: 20,
            fontWeight: 'bold',
            color: tweet.favorited
              ? '#e0245e'
              : theme.pref === 'dark'
              ? 'white'
              : 'black',
            fontSize: '.9rem',
          }}
        >
          {formatValue(
            isRetweet
              ? tweet.retweeted_status.favorite_count
              : tweet.favorite_count
          )}
        </p>
        <Icon
          size={18}
          tooltip={'Reply'}
          position={'top-start'}
          offset={[0, 5]}
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <Reply color={theme.pref === 'dark' ? 'white' : 'black'} />
        </Icon>
        <ReplyTweet
          visible={isModalOpen}
          twitterUserId={twitterUserId}
          onClose={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
          tweet={tweet}
        />
        <TweetSentiment tweetId={tweetId} isReply={isReply} />
      </StyledTweetFooterContainer>
    </CardFooter>
  );
};

export default withTheme(TweetFooter);
