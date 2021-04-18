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
  fetchTwitterAccountsEndpoint: '/api/social/twitter/accounts',
  connectToTwitterEndpoint: '/api/auth/twitter/connect',
  tweetMessageEndpoint: '/api/social/twitter/statuses/update',
  updateStreamsEndpoint: '/api/user/streampreferences',
};
