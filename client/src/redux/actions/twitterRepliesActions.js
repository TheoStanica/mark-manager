import { TwitterEndpoints } from '../../services/twitterApiEndpoints';
import axiosInstance from '../../api/buildClient';
import {
  TWITTER_SET_TWEET_REPLIES,
  TWITTER_RESET_TWEET_REPLIES,
  TWITTER_SET_REPLIES_LOADING_STATUS,
  TWITTER_ADD_MORE_REPLIES,
} from '../types';

export const fetchTweetReplies = ({
  twitterUserId,
  repliesToScreenName,
  inReplyToStatusId,
  sinceId,
}) => async (dispatch) => {
  await dispatch(setRepliesLoadingStatus({ isLoading: true }));
  const response = await axiosInstance.get(
    TwitterEndpoints.fetchTweetReplies({
      twitterUserId,
      repliesToScreenName,
      inReplyToStatusId,
      sinceId,
    })
  );
  if (response.data.length === 0) {
    await dispatch(setRepliesLoadingStatus({ isLoading: false }));
    return;
  }
  const repliesArray = response.data.map((tweet) => tweet.id_str);
  const tweetsObject = response.data.reduce(
    (obj, tweet) => ({ ...obj, [tweet.id_str]: { ...tweet } }),
    {}
  );

  await dispatch({
    type: TWITTER_SET_TWEET_REPLIES,
    payload: {
      replies: tweetsObject,
      repliesArray: repliesArray,
      maxId: response.data[response.data.length - 1].id_str,
      moreReplies: response.data.length === 30 ? true : false,
    },
  });
  await dispatch(setRepliesLoadingStatus({ isLoading: false }));
};

export const fetchMoreReplies = ({
  twitterUserId,
  repliesToScreenName,
  inReplyToStatusId,
  sinceId,
  maxId,
}) => async (dispatch) => {
  const response = await axiosInstance.get(
    TwitterEndpoints.fetchTweetReplies({
      twitterUserId,
      repliesToScreenName,
      inReplyToStatusId,
      sinceId,
      maxId,
    })
  );
  if (response.data.length === 0) {
    return;
  }

  const newReplies = response.data.slice(1);
  const repliesArray = newReplies.map((tweet) => tweet.id_str);
  const tweetsObject = newReplies.reduce(
    (obj, tweet) => ({ ...obj, [tweet.id_str]: { ...tweet } }),
    {}
  );

  await dispatch({
    type: TWITTER_ADD_MORE_REPLIES,
    payload: {
      replies: tweetsObject,
      repliesArray: repliesArray,
      maxId: response.data[response.data.length - 1].id_str,
      moreReplies: response.data.length === 30 ? true : false,
    },
  });
};

export const resetReplies = () => (dispatch) => {
  dispatch({
    type: TWITTER_RESET_TWEET_REPLIES,
  });
};

export const setRepliesLoadingStatus = ({ isLoading }) => (dispatch) => {
  dispatch({
    type: TWITTER_SET_REPLIES_LOADING_STATUS,
    payload: {
      isLoading,
    },
  });
};
