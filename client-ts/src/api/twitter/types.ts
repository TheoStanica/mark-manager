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
  entities: Array<any>;
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
  entities: Array<any>;
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
