import { DatabaseConnectionError } from '@tcosmin/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Service } from 'typedi';
import { IFacebookPageFeedResponsePayload } from '../utils/interfaces/facebook/feed';

@Service()
export class FacebookApiService {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({ baseURL: 'https://graph.facebook.com/v16.0' });
  }

  public async me(facebookAccountId: string, accessToken: string) {
    try {
      const res = await this.api.get(`/${facebookAccountId}`, {
        params: {
          access_token: accessToken,
        },
      });
      return res.data;
    } catch (error) {
      throw new DatabaseConnectionError();
    }
  }

  public async accounts(facebookAccountId: string, accessToken: string) {
    try {
      const res = await this.api.get(`/${facebookAccountId}/accounts`, {
        params: {
          access_token: accessToken,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw new DatabaseConnectionError();
    }
  }

  public async pageFeed(
    pageId: string,
    accessToken: string,
    before?: string,
    after?: string
  ) {
    try {
      const res = await this.api.get(`/${pageId}/feed`, {
        params: {
          access_token: accessToken,
          fields:
            'message,created_time,likes.limit(0).summary(true),from{id,name,picture}',
          before,
          after,
        },
      });
      return res.data as IFacebookPageFeedResponsePayload;
    } catch (error) {
      console.log(error);
      throw new DatabaseConnectionError();
    }
  }
}
