export interface FacebookAccountPageData {
  access_token: string;
  category: string;
  name: string;
  id: string;
}

export interface FacebookAccountPagesPayload {
  data: Array<FacebookAccountPageData>;
  paging: {
    cursors: {
      before: string;
      after: string;
    };
  };
}
