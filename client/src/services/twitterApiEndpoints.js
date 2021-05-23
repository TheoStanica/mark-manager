export const TwitterEndpoints = {
  loadTweetSearchStreamEndpoint: ({ search, twitterUserId }) =>
    `/api/social/twitter/search/tweets?search=${search}&twitterUserId=${twitterUserId}`,
  loadMoreTweetSearchStreamEndpoint: ({ search, maxId, twitterUserId }) =>
    `/api/social/twitter/search/tweets?search=${search}&maxId=${maxId}&twitterUserId=${twitterUserId}`,
  loadHomeTimelineStreamEndpoint: ({ twitterUserId }) =>
    `/api/social/twitter/statuses/home_timeline?twitterUserId=${twitterUserId}`,
  loadMoreHomeTimelineStreamEndpoint: ({ maxId, twitterUserId }) =>
    `/api/social/twitter/statuses/home_timeline?maxId=${maxId}&twitterUserId=${twitterUserId}`,
  fetchTwitterAccountDataEndpoint: ({ twitterUserId }) =>
    `/api/social/twitter/user?twitterUserId=${twitterUserId}`,
  fetchTweetReplies: ({
    twitterUserId,
    repliesToScreenName,
    inReplyToStatusId,
    sinceId,
    maxId,
  }) =>
    maxId
      ? `/api/social/twitter/search/tweets/comments?twitterUserId=${twitterUserId}&repliesToScreenName=${repliesToScreenName}&inReplyToStatusId=${inReplyToStatusId}&sinceId=${sinceId}&maxId=${maxId}}`
      : `/api/social/twitter/search/tweets/comments?twitterUserId=${twitterUserId}&repliesToScreenName=${repliesToScreenName}&inReplyToStatusId=${inReplyToStatusId}&sinceId=${sinceId}`,
  fetchTwitterAccountsEndpoint: '/api/social/twitter/accounts',
  connectToTwitterEndpoint: '/api/auth/twitter/connect',
  tweetMessageEndpoint: '/api/social/twitter/statuses/update',
  updateStreamsEndpoint: '/api/user/streampreferences',
  likeTweetEndpoint: '/api/social/twitter/favorites/create',
  unlikeTweetEndpoint: '/api/social/twitter/favorites/destroy',
  retweetTweetEndpoint: '/api/social/twitter/statuses/retweet',
  unRetweetTweetEndpoint: '/api/social/twitter/statuses/unretweet',
};
