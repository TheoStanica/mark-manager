import { Tweet } from './tweet';

export interface SearchPayload {
  data: {
    statuses: Tweet[];
    search_metadata?: any;
  };
}
