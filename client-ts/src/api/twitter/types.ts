export interface ISearchTweetsRequest {
  search: string;
  twitterUserId: string;
  maxId?: string;
}

export interface ISearchTweetsQueryRequest {
  id: string;
  tweet: ISearchTweetsRequest;
}

export interface ITweet {
  created_at: string;
  id: number;
  id_str: string;
  full_text: string;
  user: ITweetUserData;
  retweeted_status?: IRetweetedStatusData;
  entities: ITweetEntity;
  retweet_count: number;
  retweeted: boolean;
  favorite_count: number;
  favorited: boolean;
}

export interface ITweetEntity {
  hashtags?: Array<unknown>;
  urls?: Array<unknown>;
  user_mentions?: Array<unknown>;
  media?: Array<ITweetMediaEntity>;
  symbols?: Array<unknown>;
  polls?: Array<unknown>;
}

export interface ITweetMediaEntity {
  id: number;
  id_str: string;
  url: string;
  display_url: string;
  expanded_url: string;
  media_url_https: string;
  sizes: {
    small: {
      h: number;
      w: number;
      resize: 'fit';
    };
  };
}

export interface ITweetUserData {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  profile_image_url_https: string;
}

export interface IRetweetedStatusData {
  created_at: string;
  id: number;
  id_str: string;
  full_text: string;
  user: ITweetUserData;
  entities: ITweetEntity;
  retweet_count: number;
  retweeted: boolean;
  favorite_count: number;
  favorited: boolean;
}

export interface ISearchTweetsResponse {
  statuses: Array<ITweet>;
}

export interface ISearchTweetsResponseExtended extends ISearchTweetsResponse {
  metadata: {
    maxId: string;
  };
}

export interface ILinkedInMessage {
  id: number;
}

export interface ILikeTweetMutation {
  tweet: ITweet;
  streamId: string;
  twitterStreamData: ISearchTweetsRequest;
}

export interface IRetweetTweetMutation {
  tweet: ITweet;
  streamId: string;
  twitterStreamData: ISearchTweetsRequest;
}
