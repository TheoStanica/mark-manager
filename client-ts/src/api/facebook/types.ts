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
