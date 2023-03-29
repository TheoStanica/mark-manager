export interface AddFacebookAccountDto {
  id: string;
  accessToken: string;
  data: {
    id: string;
    displayName: string;
    username?: string;
  };
}
