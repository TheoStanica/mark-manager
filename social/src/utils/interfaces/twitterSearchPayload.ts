import { Tweet } from './tweet';

export interface TwitterSearchPayload {
  data: {
    statuses: Tweet[];
    search_metadata?: any;
  };
}
