export interface IFacebookAccountPageData {
  access_token: string;
  category: string;
  name: string;
  id: string;
}

export interface IFacebookAccountPagesPayload {
  data: Array<IFacebookAccountPageData>;
  paging: {
    cursors: {
      before: string;
      after: string;
    };
  };
}

export interface IBaseFacebookAccountRequest {
  facebookUserId: string;
}

export interface IAddFacebookAccountPageRequest
  extends IBaseFacebookAccountRequest {
  access_token: string;
  category: string;
  name: string;
  id: string;
}

export interface IFacebookPageFeedData {
  id: string;
  message: string;
  created_time: string;
  likes: {
    data: Array<any>;
    summary: {
      total_count: number;
      can_like: true;
      has_liked: false;
    };
  };
  from: {
    id: string;
    name: string;
    picture: {
      data: {
        height: number;
        width: number;
        is_silhouette: boolean;
        url: string;
      };
    };
  };
}

export interface IFacebookPageFeedResponsePayload {
  data: Array<IFacebookPageFeedData>;
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
  };
}

export interface IFacebookPageFeedRequest {
  facebookUserId: string;
  pageId: string;
  before?: string;
  after?: string;
}

export interface IFacebookPageFeedReqestExtended
  extends IFacebookPageFeedRequest {
  id: string;
}

export interface IPostMessageRequest {
  facebookUserId: string;
  pageId: string;
  message: string;
}
