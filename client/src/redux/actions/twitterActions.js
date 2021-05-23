import axiosInstance from '../../api/buildClient';
import {
  SET_ERRORS,
  TWITTER_ADD_MORE_TWEETS,
  TWITTER_ADD_STREAM,
  TWITTER_CLEAR_ALL_STREAMS,
  TWITTER_SET_STREAM_LOADING_STATUS,
  TWITTER_SET_STREAM_TWEETS,
  TWITTER_UPDATE_STREAMS,
  USER_SET_MESSAGES,
  TWITTER_ADD_MULTIPLE_STREAMS,
  TWITTER_REMOVE_STREAM,
  TWITTER_ADD_MULTIPLE_ACCOUNTS,
  TWITTER_CLEAR_ALL_ACCOUNTS,
  TWITTER_SET_ACCOUNT_DATA,
  TWITTER_FILTER_ACCOUNTS,
  TWITTER_SET_TWEET_LIKE_STATUS,
  TWITTER_SET_TWEET_RETWEET_STATUS,
  TWITTER_SET_TWEET_REPLIES,
  TWITTER_RESET_TWEET_REPLIES,
  TWITTER_SET_REPLIES_LOADING_STATUS,
} from '../types';
import { store } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { shallowEqual } from 'react-redux';
import { TwitterEndpoints } from '../../services/twitterApiEndpoints';

const handleError = ({ error }) => async (dispatch) => {
  if (error?.response?.data?.errors) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: error.response.data.errors,
      },
    });
  } else {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: [{ message: 'Something went wrong' }],
      },
    });
  }
};

export const fetchTwitterAccountsData = () => async (dispatch) => {
  try {
    const accounts = store.getState().twitterReducer.twitterAccounts;
    accounts.forEach(async (account) => {
      await dispatch(fetchTwitterAccountData({ twitterUserId: account }));
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const fetchTwitterAccountData = ({ twitterUserId }) => async (
  dispatch
) => {
  try {
    const accountData = await axiosInstance.get(
      TwitterEndpoints.fetchTwitterAccountDataEndpoint({ twitterUserId })
    );
    if (accountData) {
      await dispatch({
        type: TWITTER_SET_ACCOUNT_DATA,
        payload: {
          id: accountData.data.id_str,
          name: accountData.data.name,
          screenName: accountData.data.screen_name,
          profileImage: accountData.data.profile_image_url_https,
        },
      });
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const fetchTwitterAccounts = () => async (dispatch) => {
  try {
    const accounts = await axiosInstance.get(
      TwitterEndpoints.fetchTwitterAccountsEndpoint
    );
    if (accounts) {
      const storedAccountsArray = store.getState().twitterReducer
        .twitterAccounts;
      const accountsArray = accounts.data.map(
        (account) => account.twitterUserId
      );
      const synced = shallowEqual(accountsArray, storedAccountsArray);
      if (!synced) {
        const accountsById = accounts.data.reduce(
          (obj, account) => ({
            ...obj,
            [account.twitterUserId]: { ...account },
          }),
          {}
        );
        await dispatch({
          type: TWITTER_CLEAR_ALL_ACCOUNTS,
        });
        await dispatch({
          type: TWITTER_ADD_MULTIPLE_ACCOUNTS,
          payload: {
            accounts: accountsArray,
            accountsById: accountsById,
          },
        });
        await dispatch(filterAccounts({ accounts: accountsArray }));
      }
      await dispatch(fetchTwitterAccountsData());
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const connectToTwitter = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(
      TwitterEndpoints.connectToTwitterEndpoint
    );
    if (res) {
      window.location.assign(
        `https://twitter.com/oauth/authorize?oauth_token=${res.data.requestToken}`
      );
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const tweetNewMessage = ({ message, accounts }) => async (dispatch) => {
  try {
    accounts.forEach(async (account) => {
      await axiosInstance.post(TwitterEndpoints.tweetMessageEndpoint, {
        status: message,
        twitterUserId: account,
      });
    });
    dispatch({
      type: USER_SET_MESSAGES,
      payload: {
        message: 'Tweet was posted!',
      },
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const updateStreams = ({ streams }) => async (dispatch) => {
  await dispatch({
    type: TWITTER_UPDATE_STREAMS,
    payload: {
      streams: streams,
    },
  });
};

export const updateUserStreamsBackend = ({ streams }) => async (dispatch) => {
  try {
    const streamsById = store.getState().twitterReducer.streamsById;
    const updatedstreams = streams.map((stream) => {
      const s = streamsById[stream];
      return {
        id: s.id,
        type: s.type,
        search: s.search ? s.search : undefined,
        twitterUserId: s.twitterUserId,
      };
    });
    await axiosInstance.post(TwitterEndpoints.updateStreamsEndpoint, {
      stream_preferences: updatedstreams,
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const addStream = ({ twitterUserId, type, search }) => async (
  dispatch
) => {
  try {
    await dispatch({
      type: TWITTER_ADD_STREAM,
      payload: {
        id: uuidv4(),
        type: type,
        search: search ? search : undefined,
        twitterUserId: twitterUserId,
      },
    });
    const { streams } = store.getState().twitterReducer;
    await dispatch(updateUserStreamsBackend({ streams }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const clearAllStreams = () => async (dispatch) => {
  dispatch({
    type: TWITTER_CLEAR_ALL_STREAMS,
  });
};

export const removeStream = ({ id }) => async (dispatch) => {
  try {
    const { streams } = store.getState().twitterReducer;
    const newStreams = streams.filter((s) => s !== id);
    await dispatch(updateUserStreamsBackend({ streams: newStreams }));
    dispatch({
      type: TWITTER_REMOVE_STREAM,
      payload: {
        id: id,
      },
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const reorderStreams = ({ streams }) => async (dispatch) => {
  try {
    await dispatch(updateStreams({ streams }));
    await dispatch(updateUserStreamsBackend({ streams: streams }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const setStreamLoading = ({ id, isLoading }) => (dispatch) => {
  dispatch({
    type: TWITTER_SET_STREAM_LOADING_STATUS,
    payload: {
      id: id,
      isLoading: isLoading,
    },
  });
};

const getWhitelistedTweets = ({ blacklistedStreamId }) => {
  // gets all the tweet ids that are not inside the blacklisted Stream
  // and returns a set of tweet ids that are whitelisted

  const currentStoredStreams = store.getState().twitterReducer.streamsById;
  const tweetsToKeepSet = new Set();
  const streamsToKeep = Object.keys(currentStoredStreams).filter(
    (streamId) => streamId !== blacklistedStreamId
  );

  streamsToKeep.forEach((streamId) => {
    const tweetsToWhitelist = store.getState().twitterReducer.streamsById[
      streamId
    ]?.tweets;
    if (tweetsToWhitelist?.length > 0)
      tweetsToWhitelist.forEach((tweet) => tweetsToKeepSet.add(tweet));
  });

  return tweetsToKeepSet;
};

export const reloadTwitterStream = ({ id, search, twitterUserId }) => async (
  dispatch
) => {
  try {
    await dispatch(setStreamLoading({ id, isLoading: true }));

    const response = await axiosInstance.get(
      search
        ? TwitterEndpoints.loadTweetSearchStreamEndpoint({
            search,
            twitterUserId,
          })
        : TwitterEndpoints.loadHomeTimelineStreamEndpoint({ twitterUserId })
    );

    // create new tweet objects from response as well as an array of IDs
    const tweetsObject = response.data.statuses.reduce(
      (obj, tweet) => ({ ...obj, [tweet.id_str]: { ...tweet } }),
      {}
    );
    const tweetsIds = response.data.statuses.map((tweet) => tweet.id_str);

    const whitelistedTweetsIdsSet = getWhitelistedTweets({
      blacklistedStreamId: id,
    });

    // take all keys insider stream tweets array
    // filter those keys from tweetsById(currentTweetsById)
    const filteredTweetsObj = Object.keys(
      store.getState().twitterReducer.tweetsById
    )
      .filter((tweetId) => whitelistedTweetsIdsSet?.has(tweetId))
      .reduce(
        (obj, tweetId) => ({
          ...obj,
          [tweetId]: store.getState().twitterReducer.tweetsById[tweetId],
        }),
        {}
      );

    await dispatch({
      type: TWITTER_SET_STREAM_TWEETS,
      payload: {
        id: id,
        tweets: tweetsIds,
        metadata: {
          max_id:
            response.data.statuses[response.data.statuses.length - 1].id_str,
        },
        newTweetsById: tweetsObject,
        filteredTweetsById: filteredTweetsObj,
      },
    });
    await dispatch(setStreamLoading({ id, isLoading: false }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const loadMoreTwitterStreamTweets = ({
  id,
  search,
  maxId,
  twitterUserId,
}) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(
      search
        ? TwitterEndpoints.loadMoreTweetSearchStreamEndpoint({
            search,
            maxId,
            twitterUserId,
          })
        : TwitterEndpoints.loadMoreHomeTimelineStreamEndpoint({
            maxId,
            twitterUserId,
          })
    );

    const newTweets = response.data.statuses.slice(1);
    const tweetsObject = newTweets.reduce(
      (obj, tweet) => ({ ...obj, [tweet.id_str]: { ...tweet } }),
      {}
    );
    const newTweetsIds = newTweets.map((tweet) => tweet.id_str);

    await dispatch({
      type: TWITTER_ADD_MORE_TWEETS,
      payload: {
        id: id,
        tweets: tweetsObject,
        tweetsIds: newTweetsIds,
        metadata: {
          max_id:
            response.data.statuses[response.data.statuses.length - 1].id_str,
        },
      },
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const loadUserStreams = ({ streams }) => async (dispatch) => {
  try {
    const storedStreamsArray = store.getState().twitterReducer.streams;
    let synced = true;

    const streamsArray = streams.map((stream, idx) => {
      if (stream.id !== storedStreamsArray[idx]) {
        synced = false;
      }
      return stream.id;
    });
    if (!synced) {
      await dispatch(clearAllStreams());
      const updatedStreamsById = streams.reduce(
        (obj, stream) => ({ ...obj, [stream.id]: { ...stream } }),
        {}
      );
      await dispatch({
        type: TWITTER_ADD_MULTIPLE_STREAMS,
        payload: {
          streams: streamsArray,
          streamsById: updatedStreamsById,
        },
      });
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const filterAccounts = ({ accounts }) => (dispatch) => {
  dispatch({
    type: TWITTER_FILTER_ACCOUNTS,
    payload: {
      accounts: accounts,
    },
  });
};

export const likeTweet = ({
  twitterUserId,
  tweet,
  isReply,
  isRetweet,
}) => async (dispatch) => {
  try {
    const isLiked = isRetweet
      ? tweet.retweeted_status.favorited
      : tweet.favorited;
    const likedCount = isRetweet
      ? tweet.retweeted_status.favorite_count
      : tweet.favorite_count;

    dispatch({
      type: TWITTER_SET_TWEET_LIKE_STATUS,
      payload: {
        tweetId: tweet.id_str,
        liked: !isLiked,
        count: isLiked ? likedCount - 1 : likedCount + 1,
        isReply: isReply,
        isRetweet: isRetweet,
      },
    });

    if (isLiked) {
      await axiosInstance.post(TwitterEndpoints.unlikeTweetEndpoint, {
        twitterUserId,
        tweetId: tweet.id_str,
      });
    } else {
      await axiosInstance.post(TwitterEndpoints.likeTweetEndpoint, {
        twitterUserId,
        tweetId: tweet.id_str,
      });
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const retweetTweet = ({
  twitterUserId,
  tweet,
  isReply,
  isRetweet,
}) => async (dispatch) => {
  try {
    const isRetweeted = isRetweet
      ? tweet.retweeted_status.retweeted
      : tweet.retweeted;
    const retweetCount = isRetweet
      ? tweet.retweeted_status.retweet_count
      : tweet.retweet_count;

    dispatch({
      type: TWITTER_SET_TWEET_RETWEET_STATUS,
      payload: {
        tweetId: tweet.id_str,
        retweeted: !isRetweeted,
        count: isRetweeted ? retweetCount - 1 : retweetCount + 1,
        isReply: isReply,
        isRetweet: isRetweet,
      },
    });

    if (isRetweeted) {
      await axiosInstance.post(TwitterEndpoints.unRetweetTweetEndpoint, {
        twitterUserId,
        tweetId: tweet.id_str,
      });
    } else {
      await axiosInstance.post(TwitterEndpoints.retweetTweetEndpoint, {
        twitterUserId,
        tweetId: tweet.id_str,
      });
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

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
