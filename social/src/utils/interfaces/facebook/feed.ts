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
