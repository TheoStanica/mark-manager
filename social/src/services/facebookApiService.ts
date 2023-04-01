import { DatabaseConnectionError } from '@tcosmin/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Service } from 'typedi';

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
}
