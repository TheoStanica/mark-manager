import { ITwitterStreamData } from '../user/types';

export interface ISearchTweetsRequest extends ITwitterStreamData {
  maxId?: string;
}

export interface ISearchTweetsQueryRequest {
  id: string;
  tweet: ISearchTweetsRequest;
}

export interface ITweet {
  created_at: string;
  id: string;
  text: string;
  lang: string;

  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
    bookmark_count: number;
    impression_count: number;
  };
  author_id: string;
  entities: {
    annotations: Array<unknown>;
    urls: Array<unknown>;
  };
  attachments?: {
    media_keys: Array<string>;
  };
  in_reply_to_user_id?: string;
  referenced_tweets?: Array<{
    type: 'retweeted' | 'quoted' | 'replied_to';
    id: string;
  }>;

  // [key: string]: any;

  // id: number;
  // id_str: string;
  // full_text: string;

  // user: ITweetUserData;
  // retweeted_status?: IRetweetedStatusData;
  // entities: ITweetEntity;
  // retweet_count: number;
  // retweeted: boolean;
  // favorite_count: number;
  // favorited: boolean;
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
  media_key: string;
  type: 'photo' | 'video' | 'animated_gif';
  url: string;
  preview_image_url: string;
  width: number;
  height: number;
  public_metrics: {
    view_count: number;
    like_count: number;
    retweet_count: number;
    reply_count: number;
  };

  // id: number;
  // id_str: string;
  // url: string;
  // display_url: string;
  // expanded_url: string;
  // media_url_https: string;
  // sizes: {
  //   small: {
  //     h: number;
  //     w: number;
  //     resize: 'fit';
  //   };
  // };
}

export interface ITweetUserData {
  id: string;
  protected: boolean;
  name: string;
  profile_image_url: string;
  username: string;
  verified: boolean;
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
  };
  created_at: string;

  // id: number;
  // id_str: string;
  // name: string;
  // screen_name: string;
  // profile_image_url_https: string;
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
  // statuses: Array<ITweet>;
  // data: {
  //   tweets: Array<ITweet>;
  // };
  _realData: {
    data: Array<ITweet>;
    includes: {
      users?: Array<ITweetUserData>;
      tweets?: Array<ITweet>;
      media?: Array<ITweetMediaEntity>;
    };
    meta: {
      next_token: string;
      result_count: number;
      newest_id: string;
      oldest_id: string;
    };
  };
}

export interface ISearchTweetsResponseExtended extends ISearchTweetsResponse {
  // meta: {
  //   next_token: string;
  //   result_count: number;
  //   newest_id: string;
  //   oldest_id: string;
  //   // maxId: string;
  // };
  _rateLimit?: any;
  _instance?: any;
  _maxResultsWhenFetchLast?: number;
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

export interface ITweetRequest {
  status: string;
  twitterUserId: string;
  inReplyToStatusId?: string;
}
